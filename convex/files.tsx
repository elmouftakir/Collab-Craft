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
    // قم بحذف الملف باستخدام معرف الفايل (fileId)
    await deleteFile(fileId);
    // بعد حذف الملف بنجاح، قم بتحديث حالة fileList لإعادة تقديم القائمة بدون الملف المحذوف
    setFileList(prevFileList => prevFileList.filter(file => file._id !== fileId));
    // أضف رسالة تأكيد أو تنبيه للمستخدم بعد حذف الملف بنجاح
    alert('تم حذف الملف بنجاح');
  } catch (error) {
    // في حال حدوث خطأ أثناء عملية الحذف، يمكنك معالجة الخطأ هنا
    console.error('حدث خطأ أثناء حذف الملف:', error);
    // يمكنك أيضًا إظهار رسالة خطأ للمستخدم لتوضيح سبب عدم نجاح عملية الحذف
    alert('حدث خطأ أثناء حذف الملف، يرجى المحاولة مرة أخرى.');
  }
};
