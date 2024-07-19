"use client";

import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <Link href="/">Shutter Form</Link>
      <Link href="/list">Customers List</Link>
    </div>
  );
}
