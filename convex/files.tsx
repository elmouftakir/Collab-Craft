import {v} from 'convex/values';
import { mutation, query } from './_generated/server';

export const createFile=mutation({
    args:{
        fileName:v.string(),
        teamId:v.string(),
        createdBy:v.string(),
        archive:v.boolean(),
        document:v.string(),
        whiteboard:v.string()
    },
    handler:async(ctx, args) =>{
        const result=await ctx.db.insert('files',args);
        return result;
    },
})

export const getFiles=query({
    args:{
        teamId:v.string()
    },
    handler:async(ctx, args)=> {
        const result=ctx.db.query('files')
        .filter(q=>q.eq(q.field('teamId'),args.teamId))
        .order('desc')
        .collect();

        return result;
    },
})

export const updateDocument=mutation({
    args:{
        _id:v.id('files'),
        document:v.string()
    },
    handler:async(ctx, args) =>{
        const result =await ctx.db.patch(args._id,{document:args.document});
        return result;
    },
})

export const updateWhiteboard=mutation({
    args:{
        _id:v.id('files'),
        whiteboard:v.string()
    },
    handler:async(ctx, args) =>{
        const result =await ctx.db.patch(args._id,{whiteboard:args.whiteboard});
        return result;
    },
})



export const getFileById=query({
    args:{
        _id:v.id('files')
    },
    handler:async(ctx, args)=> {
        const result=await ctx.db.get(args._id);
        return result;
    },
})

import { deleteFile } from '@/services/fileService';

const handleDelete = async (fileId: string) => {
  try {
    // Delete the file using the file ID
    await deleteFile(fileId);
    // After successful deletion, update the fileList state to re-render the list without the deleted file
    setFileList(prevFileList => prevFileList.filter(file => file._id !== fileId));
    // Add a confirmation or alert message to the user after successful deletion
    alert('File deleted successfully');
  } catch (error) {
    // If an error occurs during the deletion process, handle the error here
    console.error('An error occurred while deleting the file:', error);
    // You can also display an error message to the user to explain why the deletion process failed
    alert('An error occurred while deleting the file, please try again.');
  }
};
