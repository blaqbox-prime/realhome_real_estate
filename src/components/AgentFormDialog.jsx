import React from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

function AgentFormDialog() {

    const handleSubmit = () => {
        alert('Creating account')
    }

  return (
    <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Become An Agent</DialogTitle>
                <DialogDescription>
                  Create your agent account.
                </DialogDescription>
              </DialogHeader>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Avatar className="mx-auto aspect-square w-24 h-24 " >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Input id="profile_pic" type="file">
                </Input>

              </div>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Agency
                  </Label>
                  <Input id="agency" value="Private" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Years of Experience
                  </Label>
                  <Input
                    id="years_of_experience"
                    value="4"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleSubmit} >Create Agent Account</Button>
              </DialogFooter>
            </DialogContent>
  )
}

export default AgentFormDialog