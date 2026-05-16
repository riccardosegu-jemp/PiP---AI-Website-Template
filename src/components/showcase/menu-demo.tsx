"use client"

import {
  ChevronDownIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  EditIcon,
  CopyIcon,
  TrashIcon,
  EyeIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuGroup,
  MenuGroupLabel,
  MenuCheckboxItem,
} from "@/components/ui/menu"

export function MenuDemo() {
  return (
    <div className="flex flex-wrap gap-4">

      {/* Menu azioni base */}
      <Menu>
        <MenuTrigger
          render={
            <Button variant="outline" size="sm" className="gap-1.5">
              Azioni <ChevronDownIcon className="size-3.5" />
            </Button>
          }
        />
        <MenuContent>
          <MenuItem>
            <EyeIcon className="size-4 text-gray-400" /> Visualizza
          </MenuItem>
          <MenuItem>
            <EditIcon className="size-4 text-gray-400" /> Modifica
          </MenuItem>
          <MenuItem>
            <CopyIcon className="size-4 text-gray-400" /> Duplica
          </MenuItem>
          <MenuSeparator />
          <MenuItem variant="destructive">
            <TrashIcon className="size-4" /> Elimina
          </MenuItem>
        </MenuContent>
      </Menu>

      {/* Menu account */}
      <Menu>
        <MenuTrigger
          render={
            <Button size="sm" className="gap-1.5">
              Account <ChevronDownIcon className="size-3.5" />
            </Button>
          }
        />
        <MenuContent>
          <MenuGroup>
            <MenuGroupLabel>mario.rossi@azienda.it</MenuGroupLabel>
            <MenuItem>
              <UserIcon className="size-4 text-gray-400" /> Profilo
            </MenuItem>
            <MenuItem>
              <SettingsIcon className="size-4 text-gray-400" /> Impostazioni
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem variant="destructive">
            <LogOutIcon className="size-4" /> Esci
          </MenuItem>
        </MenuContent>
      </Menu>

      {/* Menu con checkbox */}
      <Menu>
        <MenuTrigger
          render={
            <Button variant="secondary" size="sm" className="gap-1.5">
              Visualizza <ChevronDownIcon className="size-3.5" />
            </Button>
          }
        />
        <MenuContent>
          <MenuGroupLabel>Colonne visibili</MenuGroupLabel>
          <MenuCheckboxItem defaultChecked>Nome azienda</MenuCheckboxItem>
          <MenuCheckboxItem defaultChecked>Referente</MenuCheckboxItem>
          <MenuCheckboxItem>Settore</MenuCheckboxItem>
          <MenuCheckboxItem defaultChecked>Stato</MenuCheckboxItem>
          <MenuCheckboxItem>Data creazione</MenuCheckboxItem>
        </MenuContent>
      </Menu>

    </div>
  )
}
