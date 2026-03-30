<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Contact/Index', [
            'contacts' => Contact::latest()->get()
        ]);
    }

    // 対応済み・未対応を切り替える
    public function toggleReplied(Contact $contact)
    {
        $contact->update([
            'is_replied' => !$contact.is_replied,
        ]);

        return redirect()->back();
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return redirect()->back()->with('success', 'お問い合わせを削除しました');
    }
}