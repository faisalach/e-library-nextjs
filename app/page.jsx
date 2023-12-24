"use client"
import { useEffect, useState } from "react";

function Home() {
	const [isShowModal,setIsShowModal] = useState(false);
	const [dataInput,setDataInput] 	= useState([]);
	const [dataBuku, setDataBuku] = useState(null);

	const resetForm = () => {
		setDataInput({
			id 	: 0,
			judul_buku : "",
			kategori_buku : "",
			penerbit : "",
			pengarang : "",
			tahun_terbit : "",
			jumlah_halaman : "",
			jumlah_eksemplar : "",
		})
	}

	
	const handleGetData = () => {
		fetch("/api")
		.then((res) => res.json())
		.then((data) => {
			setDataBuku(data.buku)
		});
	}

	const handleInput = (e) => {
		const { id, value } = e.target;
		setDataInput(prevState => ({
			...prevState,
			[id]: value
		}));
	}

	const handleEdit = (data) => {
		setDataInput({
			id 	:data._id,
			judul_buku : data.judul_buku,
			kategori_buku : data.kategori_buku,
			penerbit : data.penerbit,
			pengarang : data.pengarang,
			tahun_terbit : data.tahun_terbit,
			jumlah_halaman : data.jumlah_halaman,
			jumlah_eksemplar : data.jumlah_eksemplar,
		})

		setIsShowModal(true);
	}

	const handleDelete = (id) => {
		if(window.confirm("Hapus buku ini?")){
			fetch("/api/"+id,{
				method : "DELETE",
			})
			// .then((res) => res.json())
			.then(() => {
				handleGetData()
				setIsShowModal(false);
			});
		}
	}

	const handleSubmit = async () => {
		if(dataInput.id !== 0){
			fetch("/api/"+dataInput.id,{
				method : "PUT",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},			  
				body : JSON.stringify({
					judul_buku : dataInput.judul_buku,
					kategori_buku : dataInput.kategori_buku,
					penerbit : dataInput.penerbit,
					pengarang : dataInput.pengarang,
					tahun_terbit : dataInput.tahun_terbit,
					jumlah_halaman : dataInput.jumlah_halaman,
					jumlah_eksemplar : dataInput.jumlah_eksemplar,
				})
			})
			// .then((res) => res.json())
			.then(() => {
				handleGetData()
				setIsShowModal(false);
			}).catch((err) => {
				console.log(err);
			});
		}else{
			await fetch("/api",{
				method : "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},			  
				body : JSON.stringify({
					judul_buku : dataInput.judul_buku,
					kategori_buku : dataInput.kategori_buku,
					penerbit : dataInput.penerbit,
					pengarang : dataInput.pengarang,
					tahun_terbit : dataInput.tahun_terbit,
					jumlah_halaman : dataInput.jumlah_halaman,
					jumlah_eksemplar : dataInput.jumlah_eksemplar,
				})
			})
			// .then((res) => res.json())
			.then(() => {
				handleGetData()
				setIsShowModal(false);
			});
		}
	}


	useEffect(() => {
		handleGetData()
	}, []);

	return (
		<>
			<nav className="bg-gray-200 border-gray-200 dark:bg-gray-900 mb-3">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
					<a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">e-Library</span>
					</a>
				</div>
			</nav>

			<div className="p-5">
				<button onClick={e => {resetForm(); setIsShowModal(true) }} className="block mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
					Tambah Buku
				</button>
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Judul Buku
							</th>
							<th scope="col" className="px-6 py-3">
								Kategori Buku
							</th>
							<th scope="col" className="px-6 py-3">
								Penerbit
							</th>
							<th scope="col" className="px-6 py-3">
								Pengarang
							</th>
							<th scope="col" className="px-6 py-3">
								Tahun Terbit
							</th>
							<th scope="col" className="px-6 py-3">
								Jumlah Halaman
							</th>
							<th scope="col" className="px-6 py-3">
								Jumlah Eksemplar
							</th>
							<th scope="col" className="px-6 py-3">
								#
							</th>
						</tr>
					</thead>
					<tbody>
						{ dataBuku && dataBuku.map(row => (
								<tr key={row._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<td className="px-6 py-4">
										{row.judul_buku}
									</td>
									<td className="px-6 py-4">
										{row.kategori_buku}
									</td>
									<td className="px-6 py-4">
										{row.penerbit}
									</td>
									<td className="px-6 py-4">
										{row.pengarang}
									</td>
									<td className="px-6 py-4">
										{row.tahun_terbit}
									</td>
									<td className="px-6 py-4">
										{row.jumlah_halaman} Halaman
									</td>
									<td className="px-6 py-4">
										{row.jumlah_eksemplar} Eksemplar
									</td>
									<td className="px-6 py-4">
										<button onClick={e => handleEdit(row)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
										<button onClick={e => handleDelete(row._id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hapus</button>
									</td>
								</tr>
							))
							
						}
					</tbody>
				</table>
			</div>

		

			<div id="default-modal" tabIndex="-1" aria-hidden="true" className={`${isShowModal ? "flex" : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
				<div className="relative p-4 w-full max-w-2xl max-h-full">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								Buku
							</h3>
							<button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={e => setIsShowModal(false)}>
								<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						<div className="p-4 md:p-5 space-y-4">
							<div className="relative mb-3">
								<input required value={dataInput.judul_buku} onChange={handleInput} type="text" id="judul_buku" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
								<label htmlFor="judul_buku" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Judul Buku</label>
							</div>
							<div className="relative mb-3">
								<select required value={dataInput.kategori_buku} onChange={handleInput} type="text" id="kategori_buku" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" ">
									<option value="">Pilih</option>
									<option value="Buku Anak">Buku Anak</option>
									<option value="Buku Belajar">Buku Belajar</option>
									<option value="Novel">Novel</option>
									<option value="Majalah">Majalah</option>
								</select>
								<label htmlFor="kategori_buku" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Kategori Buku</label>
							</div>
							<div className="relative mb-3">
								<input required value={dataInput.penerbit} onChange={handleInput} type="text" id="penerbit" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
								<label htmlFor="penerbit" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Penerbit</label>
							</div>
							<div className="relative mb-3">
								<input required value={dataInput.pengarang} onChange={handleInput} type="text" id="pengarang" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
								<label htmlFor="pengarang" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Pengarang</label>
							</div>
							<div className="relative mb-3">
								<input required value={dataInput.tahun_terbit} onChange={handleInput} type="number" id="tahun_terbit" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
								<label htmlFor="tahun_terbit" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Tahun Terbit</label>
							</div>
							<div className="relative mb-3">
								<input required value={dataInput.jumlah_halaman} onChange={handleInput} type="number" id="jumlah_halaman" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
								<label htmlFor="jumlah_halaman" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Jumlah Halaman</label>
							</div>
							<div className="relative mb-3">
								<input required value={dataInput.jumlah_eksemplar} onChange={handleInput} type="number" id="jumlah_eksemplar" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
								<label htmlFor="jumlah_eksemplar" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Jumlah Eksemplar</label>
							</div>
						</div>
						<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
							<button onClick={e => setIsShowModal(false)} type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
						</div>
					</div>
				</div>
			</div>
			
			<div className={`${isShowModal ? "block" : 'hidden'} fixed top-0 left-0 right-0 bottom-0 bg-gray-100 opacity-50`}></div>

		</>
	);
}

export default Home;
