"use client"

import React from "react"
import { Navbar, NavbarBrand, NavbarContent, Link, Chip } from "@nextui-org/react"

export function Header() {
    return (
        <Navbar maxWidth="full" position="static">
            <NavbarContent>
                <NavbarBrand className="w-fit">
                    <Link className="font-bold" href="/">RuneSync</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <Chip variant="bordered" color="default">Make sure to install the plugin!</Chip>
            </NavbarContent>
        </Navbar>
    )
}