/* eslint-disable react/prop-types */
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
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FaRegEdit, FaSortDown, FaSortUp } from "react-icons/fa";
import { deleteProperty as removeProperty } from "@/services/propertyService";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import { useMemo, useState } from "react";

const SORT_FIELDS = {
  name: (property) => property.title,
  description: (property) => property.description,
  type: (property) => property.property_type,
  city: (property) => property.city,
  price: (property) => Number(property.price ?? 0),
};

function PropertiesTable({ properties = [], editable=false, className='' }) {
  const [sort, setSort] = useState({ field: "name", direction: "asc" });

  const sortedProperties = useMemo(() => {
    const getValue = SORT_FIELDS[sort.field];

    return [...properties].sort((firstProperty, secondProperty) => {
      const firstValue = getValue(firstProperty) ?? "";
      const secondValue = getValue(secondProperty) ?? "";
      const comparison = typeof firstValue === "number"
        ? firstValue - secondValue
        : String(firstValue).localeCompare(String(secondValue), undefined, { sensitivity: "base" });

      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [properties, sort]);

  const handleSort = (field) => {
    setSort((currentSort) => ({
      field,
      direction: currentSort.field === field && currentSort.direction === "asc" ? "desc" : "asc",
    }));
  };

  const renderSortHeader = (field, label, className = "") => {
    const isActive = sort.field === field;
    const indicator = isActive ? (sort.direction === "asc" ? <FaSortUp /> : <FaSortDown />) : "";

    return (
      <TableHead className={className} aria-sort={isActive ? `${sort.direction}ending` : "none"}>
        <button
          type="button"
          className="font-medium hover:text-gray-900 flex gap-2 items-center"
          onClick={() => handleSort(field)}
        >
          {indicator}{label}
        </button>
      </TableHead>
    );
  };

  const handleDeleteProperty = async (id) => {
    const response = await removeProperty(id)

  if(response.status == 204){
    toast.success(`Property ${id} deleted successfully`)
  }else {
    toast.error(`Property ${id} could not be deleted`)
    
  }
  }

  return (
    <div className={`${className}`}>
      {properties.length == 0 ? (
        <p className="text-center italic">No data available</p>
      ) : (
        <Pagination
          items={sortedProperties}
          itemsPerPage={10}
          ariaLabel="Property pages"
          renderItems={(visibleProperties) => (
            <Table>
              <TableCaption>A list of your properties.</TableCaption>
              <TableHeader>
                <TableRow>
                  {renderSortHeader("name", "Name")}
                  {renderSortHeader("description", "Description")}
                  {renderSortHeader("type", "Type")}
                  {renderSortHeader("city", "City")}
                  {renderSortHeader("price", "Price", "text-right")}
                  {editable == true && <TableHead>Edit</TableHead>}
                  {editable == true && <TableHead>Delete</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>{property.title}</TableCell>
                    <TableCell>{property.description}</TableCell>
                    <TableCell>{property.property_type}</TableCell>
                    <TableCell>{property.city}</TableCell>
                    <TableCell className="text-right w-32">R{formattedNumber(property.price)}</TableCell>
                    {editable == true && <TableCell><FaRegEdit className="scale-125 cursor-pointer" onClick={() => {}} /></TableCell>}
                    {editable == true && <TableCell><RiDeleteBack2Fill className="text-red-700 scale-125 cursor-pointer" onClick={() => { handleDeleteProperty(property.id); }} /></TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        />
      )}
    </div>
  );
}

export default PropertiesTable;
