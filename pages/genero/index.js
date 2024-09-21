"use client";
import Link from "next/link";
import { useState } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, useForm } from 'react-hook-form';

export default function Home() {
  

  return (
    <div className="">
      <h1 className="text-center mt-5 font-bold text-2xl">Cadastro de Gênero</h1>

      <form className="flex flex-col w-52 border-2 border-black-100 p-2">
        <label>Nome do gênero</label>
        <input className="border-2 border-red-100 " id="sobrenome" type="text" autoComplete="sobrenome"/>


      </form>

<Link href='/genero/novo'>
    <div className="hover:bg-slate-300  hover:border-gray-600 col-span-1 border border-gray-400 bg-gray-300 h-24 rounded-md shadow-lg items-center flex justify-center m-2 flex-col shadow-blue-300 p-2 text-center">

    <span className="">Cadastrar genero</span>
    </div>
  </Link>

    </div>
  )
}