<?php

namespace App\Http\Controllers;

use Log;
use Illuminate\Http\Request;
use Spatie\DiscordAlerts\Facades\DiscordAlert;
use Spatie\DiscordAlerts\Jobs\SendToDiscordChannelJob;

class ContactFormController extends Controller
{


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);


        // Send discord message

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => 'https://ntfy.sh/trephy_portfolio',
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
            ],
            CURLOPT_RETURNTRANSFER => true,
        ]);

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            Log::error('Curl error: ' . curl_error($curl));
        }

        curl_close($curl);
        // Dispatch a job to send the Discord alert
        return response()->json(['message' => 'Message sent!']);

    }
}
