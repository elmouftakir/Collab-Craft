import { FileListContext } from '@/app/_context/FilesListContext';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, Delete } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { api } from '@/convex/_generated/api';

export interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);



function handleDelete(DeleteFile: { _id: any }) {
  // Send a request to your backend API to delete the file
  axios.delete(`/api/files/${DeleteFile._id}`)
      .then((res) => {
      // Handle success, update the fileList state or perform any other action
      console.log('File deleted successfully');
      const updatedFileList = fileList.filter((item: { _id: any }) => item._id !== DeleteFile._id);
      setFileList(updatedFileList);
    })
    .catch((error: any) => {
      // Handle error
      console.error('Error deleting file:', error);
    });
}


  return (
    <div className='mt-10'>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList && fileList.map((file: FILE, index: number) => (
              <tr key={index} className="odd:bg-gray-50 cursor-pointer" onClick={() => router.push('/workspace/' + file._id)}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format('DD MMM YYYY')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format('DD MMM YYYY')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user && <Image src={user.picture} alt='user' width={30} height={30} className='rounded-full' />}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='gap-3' onClick={() => handleDelete(file)}>
                        <Archive className='h-4 w-4' /> Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className='gap-3' onClick={() => handleDelete(file)}>
                        <Delete className='h-4 w-4' /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
