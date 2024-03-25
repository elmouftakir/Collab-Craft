import { FileListContext } from '@/app/_context/FilesListContext';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, Delete, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import  from './(routes)/dashboard/_components/FileList'; // Change from 'next/navigation' to 'next/router'

export interface FILE {
  archive: boolean,
  createdBt: string,
  document: string,
  fileName: string,
  teamId: string,
  whiteboard: string,
  _id: string,
  _creationTime: number
}

function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const { user }: any = useKindeBrowserClient();
  const router = router_1.useRouter();

  // Define handleDelete function outside of the component
  const handleDelete = async (fileId: string) => {
    try {
      // Delete the file using the file ID
      // Assume deleteFile is a function that handles file deletion
      await deleteFile(fileId);
      
      // After successful deletion, update the fileList state to re-render the list without the deleted file
      setFileList((prevFileList: any[]) => prevFileList.filter(file => file._id !== fileId));
      
      // Add a confirmation or alert message to the user after successful deletion
      alert('File deleted successfully');
    } catch (error) {
      // If an error occurs during the deletion process, handle the error here
      console.error('An error occurred while deleting the file:', error);
      
      // You can also display an error message to the user to explain why the deletion process failed
      alert('An error occurred while deleting the file, please try again.');
    }
  };

  useEffect(() => {
    fileList_ && setFileList(fileList_);
    console.log(fileList_);
  }, [fileList_]);

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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fileList && fileList.map((file: FILE, index: number) => (
              <tr key={index} className="odd:bg-gray-50 cursor-pointer"
                onClick={() => router.push('/workspace/' + file._id)}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {file.fileName}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {moment(file._creationTime).format('DD MMM YYYY')} </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {moment(file._creationTime).format('DD MMM YYYY')}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user && <Image src={user?.picture}
                    alt='user'
                    width={30}
                    height={30}
                    className='rounded-full'
                  />}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className='gap-3'>
                        <Archive className='h-4 w-4' /> Archive
                      </DropdownMenuItem>
                      {/* Pass the fileId to handleDelete function */}
                      <DropdownMenuItem className='gap-3' onClick={() => handleDelete(file._id)}>
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

function deleteFile(fileId: string) {
  throw new Error('Function not implemented.');
}

