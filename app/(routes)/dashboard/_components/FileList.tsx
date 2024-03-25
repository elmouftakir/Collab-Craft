import { FileListContext } from '@/app/_context/FilesListContext';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, Delete, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/router';

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
  const [fileList, setFileList] = useState<FILE[] | undefined>([]);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const handleDelete = async (fileId: string) => {
    try {
      // Your file deletion logic here
      // Assuming there's a deleteFile function to handle file deletion
      // await deleteFile(fileId);
      
      // Update the fileList state after successful deletion
      setFileList((prevFileList) => prevFileList?.filter((file) => file._id !== fileId));
      
      // Provide feedback to the user
      alert('File deleted successfully');
    } catch (error) {
      console.error('An error occurred while deleting the file:', error);
      alert('An error occurred while deleting the file, please try again.');
    }
  };

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  return (
    <div className='mt-10'>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</td>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fileList && fileList.map((file: FILE) => (
              <tr key={file._id} className="odd:bg-gray-50 cursor-pointer">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {file.fileName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {moment(file._creationTime).format('DD MMM YYYY')}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => router.push('/workspace/' + file._id)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(file._id)}>
                        Delete
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
