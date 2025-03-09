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

        DiscordAlert::message("You have a new message from your portfolio", [
            [
                'title' => $data['name'],
                'description' => $data['message'],
                'author' => ['name' => $data['email']]
            ]
        ]);
        // Dispatch a job to send the Discord alert
        return response()->json(['message' => 'Message sent!']);

    }
}
