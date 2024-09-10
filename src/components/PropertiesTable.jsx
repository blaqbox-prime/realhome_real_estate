import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formattedNumber } from "@/lib/utils";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

function PropertiesTable({ properties = [], editable=false }) {
  return (
    <div>
      {properties.length == 0 ? (
        <p className="text-center italic">No data available</p>
      ) : (
        <Table>
          <TableCaption>A list of your favourite properties.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Property</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Price</TableHead>
              
              { editable == true && <TableHead>Edit</TableHead> }
              { editable == true && <TableHead>Delete</TableHead> } 
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow>
                <TableCell className="font-medium">{property.id}</TableCell>
                <TableCell>{property.title}</TableCell>
                <TableCell>{property.description}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>{property.city}</TableCell>
                <TableCell className="text-right">R{formattedNumber(property.price)}</TableCell>
                
                { editable == true && <TableCell> <FaRegEdit className="scale-125 cursor-pointer" /> </TableCell> }
                { editable == true && <TableCell> <RiDeleteBack2Fill className="text-red-700 scale-125 cursor-pointer"/> </TableCell> }
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default PropertiesTable;
