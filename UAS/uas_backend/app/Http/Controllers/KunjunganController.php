<?php

namespace App\Http\Controllers;

use App\Models\Kunjungan;
use App\Models\Pasien;
use Illuminate\Http\Request;

class KunjunganController extends Controller
{
    public function index($id)
    {
        // pastikan pasien ada
        Pasien::findOrFail($id);

        $kunjungan = Kunjungan::where('pasien_id', $id)->get();

        return response()->json($kunjungan);
    }

    public function store(Request $request, $id)
    {
        Pasien::findOrFail($id);

        $kunjungan = Kunjungan::create([
            'pasien_id' => $id,
            'tanggal_kunjungan' => $request->tanggal_kunjungan,
            'keluhan' => $request->keluhan,
            'diagnosa' => $request->diagnosa,
            'tindakan' => $request->tindakan,
            'dokter' => $request->dokter,
            'catatan' => $request->catatan,
        ]);

        return response()->json($kunjungan, 201);
    }
}