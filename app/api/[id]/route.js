import connectMongoDB from "@/libs/mongodb";
import Buku from "@/models/buku";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { judul_buku, kategori_buku, penerbit, pengarang, tahun_terbit, jumlah_halaman, jumlah_eksemplar } = await request.json();
  await connectMongoDB();
  await Buku.findByIdAndUpdate(id, { judul_buku, kategori_buku, penerbit, pengarang, tahun_terbit, jumlah_halaman, jumlah_eksemplar });
  return NextResponse.json({ message: "Buku Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const Buku = await Buku.findOne({ _id: id });
  return NextResponse.json({ Buku }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  await Buku.findByIdAndDelete(id);
  return NextResponse.json({ message: "Buku deleted" }, { status: 200 });
}
