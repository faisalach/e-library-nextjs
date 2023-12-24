"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditContactForm(contact) {
  const detailContact = contact.contact;
  const [namaDepan, setNamaDepan] = useState(detailContact.namaDepan);
  const [namaBelakang, setnamaBelakang] = useState(detailContact.namaBelakang);
  const [gender, setGender] = useState(detailContact.gender);
  const [category, setCategory] = useState(detailContact.category);
  const [alamat, setAlamat] = useState(detailContact.alamat);
  const [email, setEmail] = useState(detailContact.email);
  const [noPhone, setNoPhone] = useState(detailContact.noPhone);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(namaDepan, namaBelakang, gender, category, alamat, email, noPhone);

    try {
      const res = await fetch(`/api/contacts/${detailContact._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ namaDepan, namaBelakang, gender, category, alamat, email, noPhone }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input onChange={(e) => setNamaDepan(e.target.value)} value={namaDepan} className="border border-slate-500 px-8 py-2" type="text" placeholder="Nama Depan" />
      <input onChange={(e) => setnamaBelakang(e.target.value)} value={namaBelakang} className="border border-slate-500 px-8 py-2" type="text" placeholder="Nama Belakang" />
      <input onChange={(e) => setGender(e.target.value)} value={gender} className="border border-slate-500 px-8 py-2" type="text" placeholder="Gender" />
      <input onChange={(e) => setCategory(e.target.value)} value={category} className="border border-slate-500 px-8 py-2" type="text" placeholder="Kategori" />
      <input onChange={(e) => setAlamat(e.target.value)} value={alamat} className="border border-slate-500 px-8 py-2" type="text" placeholder="Alamat" />
      <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-slate-500 px-8 py-2" type="text" placeholder="Email" />
      <input onChange={(e) => setNoPhone(e.target.value)} value={noPhone} className="border border-slate-500 px-8 py-2" type="text" placeholder="No Phone" />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Update Contact</button>
    </form>
  );
}
