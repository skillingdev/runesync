"use client"

import React from "react"
import { Navbar, NavbarBrand, NavbarContent, Link, Chip, Image } from "@nextui-org/react"

export function Header() {
    return (
        <Navbar maxWidth="full" position="static">
            <NavbarContent>
                <Image className="h-[64px] mt-6" src="/Rune_Sync_Big.png" />
                <NavbarBrand className="w-fit">
                    <Link className="font-bold" href="/">RuneSync</Link>
                </NavbarBrand>
            </NavbarContent>
        </Navbar>
    )
}

/*

            <NavbarContent justify="end">
                <Chip variant="bordered" color="default">Make sure to install the plugin!</Chip>
            </NavbarContent>

 */