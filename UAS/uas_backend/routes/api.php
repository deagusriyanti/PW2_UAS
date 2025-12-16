<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\KunjunganController;
use App\Http\Controllers\AuthController;



Route::get('/kunjungan', [KunjunganController::class, 'index']);

// CRUD pasien
Route::apiResource('pasien', PasienController::class);

// Kunjungan
Route::get('/pasien/{id}/kunjungan', [KunjunganController::class, 'index']);
Route::post('/pasien/{id}/kunjungan', [KunjunganController::class, 'store']);
// GET satu kunjungan pasien
Route::get('/pasien/{id}/kunjungan/{kunjunganId}', [KunjunganController::class, 'show']);
Route::put('/pasien/{id}/kunjungan/{kunjunganId}', [KunjunganController::class, 'update']);
Route::delete('/pasien/{id}/kunjungan/{kunjunganId}', [KunjunganController::class, 'destroy']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);