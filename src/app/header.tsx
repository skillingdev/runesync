"use client"

import React from "react"
import { Navbar, NavbarBrand, NavbarContent, Link, NavbarMenu, NavbarMenuToggle, Chip } from "@nextui-org/react"
import { NavItems } from "./nav-items"

export function Header() {
    return (
        <Navbar maxWidth="full" position="static">
            <NavbarContent>
                <NavbarMenuToggle
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">RuneSync</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <Chip color="secondary">Make sure to install the plugin!</Chip>
            </NavbarContent>
            <NavbarMenu>
                <NavItems />
            </NavbarMenu>
        </Navbar>
    )
}