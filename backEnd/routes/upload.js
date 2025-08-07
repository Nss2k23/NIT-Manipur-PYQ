import express from 'express'
import { supabaseAdmin, supabaseClient } from '../database/supabase.js'
import multer from 'multer';


const upload = multer({storage:multer.memoryStorage()});

const router=express.Router();

router.post('/',upload.single("file"),async(req,res)=>
{
    const {year,department,semester,subject,faculty}=req.body;
    const file=req.file;
    if (!file || !year || !department || !semester || !subject || !faculty) {
    return res.status(400).json({ message: "Missing required fields or file" });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); 
    const sanitizedFileName = file.originalname.replace(/\s+/g, '_');
    const filePath = `pyq/${year}/${department}/${semester}/${subject}/${faculty}/${timestamp}/originalName-${sanitizedFileName}`;
    console.log(filePath);

    try{
        //inserting inot storage
            console.log('file.buffer length:', file.buffer?.length);

            const { data: uploadData, error: uploadError} = await supabaseAdmin.storage
            .from('q-paper')
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                upsert: true, // optional: overwrite if same file
            });

            // if(error1)
            // {
            // console.log('error1');
            // console.log(error1);
            // console.error('Storage error:', error1.message);
            // return res.status(401).json({message:"error in storage insertion"});
            // }

            if ( uploadError || !uploadData) {
                console.log('❌ Storage upload failed');
                console.log('Full error object:', uploadError); // ← this shows all properties
                return res.status(401).json({ message: "error in storage insertion" });
            }




            console.log('successful insertion into storage');


            const { data: { publicUrl } } = supabaseClient.storage
            .from('q-paper')
            .getPublicUrl(filePath);


            const {data:insertionData,error:insertionError}=await supabaseAdmin.from('pyq').insert({
            year,
            department,
            semester,
            subject,
            faculty,
            pyq_link: publicUrl
            });

            if (insertionError) {
                console.log('insertionError:', insertionError);
            // handle error and delete file

                
                    console.log('insertData',insertionData);

                    //delete the file as error in insertion in table pyq
                    const { data, error } = await supabaseClient.storage
                        .from('q-paper') // your bucket name
                        .remove([filePath]);

                    if (error) {
                        console.error('❌ Error deleting file:', error.message);
                    } else {
                        console.log('✅ File deleted successfully:', data);
                    }

                    return res.status(402).json({message:"Error during insertion to pyq table.So delete this particular. Try again"})
            } 
            else {
                console.log('Insert successful:', insertionData);
            }
    
            console.log('successful insertion into pyq table');
            console.log('upload succesful');
            return res.status(200).json({ message: "Upload successful!" });

    
    }
    catch(error)
    {
            console.log('inside catch block');
            return res.status(403).json({message:"something unwanted happened"});
    }

})

export default router;