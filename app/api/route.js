import connectMongoDB from "@/libs/mongodb";
import Buku from "@/models/buku";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { judul_buku, kategori_buku, penerbit, pengarang, tahun_terbit, jumlah_halaman, jumlah_eksemplar } = await request.json();
  await connectMongoDB();
  await Buku.create({ judul_buku, kategori_buku, penerbit, pengarang, tahun_terbit, jumlah_halaman, jumlah_eksemplar });
  return NextResponse.json({ message: "Buku Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const buku = await Buku.find();
  return NextResponse.json({ buku });
}

