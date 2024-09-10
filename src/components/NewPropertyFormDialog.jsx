import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "./ui/switch";

function NewPropertyFormDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Property</Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] sm:max-w-[425px] md:max-w-[600px] max-h-[90vh] overflow-y-scroll">
        <DialogHeader className="text-left">
          <DialogTitle>New Property</DialogTitle>
          <DialogDescription>Create a new property listing</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* New Property Form */}
            <div className="flex flex-col gap-4">
              <Label htmlFor="title" className="text-left">
                Property Title
              </Label>
              <Input
                id="title"
                placeholder="Mountainside Manor"
                className=""
                {...register("title", { required: true })}
              />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-4">
              <Label htmlFor="description" className="">
                Description
              </Label>
              <Textarea
                id="description"
                className="resize-none"
                placeholder="Describe your property in detail. Make it compelling for potential clients and buyers"
                {...register("description", { required: true })}
              />
            </div>
            {/* Price */}
            <div className="flex flex-col gap-4">
              <Label htmlFor="price" className="">
                Selling Price
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                max="999999.99"
                className=""
                placeholder="0"
                {...register("price", { required: true })}
              />
            </div>

            <Separator />

            <div className="">
              <h2 className="font-semibold text-lg">Address</h2>
              <p className="text-sm text-gray-500">
                Where can we find this property?
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="street_address">Street Address</Label>
                <Input
                  id="address"
                  placeholder="65 Nelson Mandela drive"
                  {...register("address", { required: true })}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Sandton"
                  {...register("city", { required: true })}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  placeholder="Gauteng"
                  {...register("province", { required: true })}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="zip code">Zip Code</Label>
                <Input id="zipcode" placeholder="0699" maxLength="5" />
              </div>
            </div>

            <Separator />

            <div className="">
              <h2 className="font-semibold text-lg">Property Specification</h2>
              <p className="text-sm text-gray-500">
                Let's get into the specifics
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="property type">Property Type</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Select a property type"
                    {...register("property_type")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TownHouse">Town House</SelectItem>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="system">Apartment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="1"
                  max="99"
                  placeholder="1"
                  {...register("bedrooms", { required: true })}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="1"
                  max="99"
                  placeholder="1"
                  {...register("bathrooms", { required: true })}
                />
              </div>
              <div className="col-span-4 flex flex-col gap-4">
                <Label htmlFor="square meters">Square Meters</Label>
                <Input
                  id="square_meters"
                  type="number"
                  min="5"
                  max="99999"
                  placeholder="100"
                  {...register("square_meters", { required: true })}
                />
              </div>
            </div>

            <Separator />

            <div className="">
              <h2 className="font-semibold text-lg">Amenities</h2>
              <p className="text-sm text-gray-500">
                Some nice extras on the property
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex gap-2 items-center">
                <Label htmlFor="garage">Garage</Label>
                <Switch {...register("garage")} />
              </div>
              <div className="flex gap-2 items-center">
                <Label htmlFor="Garden">Garden</Label>
                <Switch {...register("garden")} />
              </div>
              <div className="flex gap-2 items-center">
                <Label htmlFor="Swimming Pool">Pool</Label>
                <Switch {...register("pool")} />
              </div>
            </div>

            <Separator />

            <div className="">
              <h2 className="font-semibold text-lg">Images</h2>
              <p className="text-sm text-gray-500">
                Finally, add some images to make your listing stand out
              </p>

              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create new property</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewPropertyFormDialog;
