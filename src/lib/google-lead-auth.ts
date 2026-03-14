"use client";

import { getApps, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";

type GoogleLeadIdentity = {
  name: string;
  email: string;
};

const STORAGE_KEY = "mspk_google_lead_identity";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function hasFirebaseConfig() {
  return Object.values(firebaseConfig).every((value) => Boolean(value));
}

function readStoredIdentity(): GoogleLeadIdentity | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<GoogleLeadIdentity>;
    if (!parsed.email) return null;
    return {
      name: parsed.name || "",
      email: parsed.email,
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function storeIdentity(identity: GoogleLeadIdentity) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
}

export function getStoredGoogleLeadIdentity() {
  return readStoredIdentity();
}

export async function getGoogleLeadIdentity() {
  const stored = readStoredIdentity();
  if (stored) {
    return stored;
  }

  if (typeof window === "undefined" || !hasFirebaseConfig()) {
    return null;
  }

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  const auth = getAuth();
  auth.languageCode = "en";
  await setPersistence(auth, browserLocalPersistence);

  const currentUser = auth.currentUser;
  if (currentUser?.email) {
    const identity = {
      name: currentUser.displayName || "",
      email: currentUser.email,
    };
    storeIdentity(identity);
    return identity;
  }

  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  provider.addScope("profile");
  provider.setCustomParameters({
    prompt: "select_account",
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email || "";
    const name = result.user.displayName || "";

    if (!email) {
      await signOut(auth).catch(() => undefined);
      return null;
    }

    const identity = { email, name };
    storeIdentity(identity);
    await signOut(auth).catch(() => undefined);
    return identity;
  } catch {
    return null;
  }
}
