// Nutricomp · infraestrutura de pedidos (Cloudflare Pages Functions + D1).
// Nenhum CPF/CNPJ bruto é salvo: somente HMAC com chave privada no ambiente.
export const PRICES={10:22000,20:38000,30:51000};
export const DISH_CODES=new Set(["1","2.1","4","8","9","10.1","14.1","16","1.1","2","4.1","8.1","9.1","11","14","15","16.1","17","18","19","20","21"]);
export const SEAFOOD=new Set(["17","18","19","20","21"]);
export function normalizeDocument(v){return String(v||"").toUpperCase().replace(/[^0-9A-Z]/g,"")}
function same(v){return /^([0-9A-Z])\1+$/.test(v)}
export function validCPF(v){const s=normalizeDocument(v);if(!/^\d{11}$/.test(s)||same(s))return false;for(let n=9;n<=10;n++){let sum=0;for(let i=0;i<n;i++)sum+=Number(s[i])*(n+1-i);let digit=(sum*10)%11;if(digit===10)digit=0;if(digit!==Number(s[n]))return false}return true}
export function validCNPJ(v){const s=normalizeDocument(v);if(!/^[0-9A-Z]{12}\d{2}$/.test(s)||same(s))return false;const val=(ch)=>ch.charCodeAt(0)-48;function digit(len,weights){let sum=0;for(let i=0;i<len;i++)sum+=val(s[i])*weights[i];const rem=sum%11;return rem<2?0:11-rem}return digit(12,[5,4,3,2,9,8,7,6,5,4,3,2])===Number(s[12])&&digit(13,[6,5,4,3,2,9,8,7,6,5,4,3,2])===Number(s[13])}
export function documentType(v){const s=normalizeDocument(v);return validCPF(s)?"CPF":validCNPJ(s)?"CNPJ":null}
export async function docHash(value,secret){const data=new TextEncoder().encode(normalizeDocument(value));const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);const bytes=new Uint8Array(await crypto.subtle.sign("HMAC",key,data));return Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("")}
export function json(payload,status=200){return new Response(JSON.stringify(payload),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"}})}
export function adminAllowed(request,env){const a=request.headers.get("authorization")||"";const b="Bearer "+String(env.ADMIN_TOKEN||"");if(!env.ADMIN_TOKEN||a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0}
export async function ensureSchema(db){
 await db.batch([
 db.prepare("CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, doc_hash TEXT NOT NULL UNIQUE, doc_type TEXT NOT NULL, doc_last4 TEXT NOT NULL, name TEXT NOT NULL, phone TEXT NOT NULL, offers_opt_in INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"),
 db.prepare("CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, request_id TEXT NOT NULL UNIQUE, customer_id INTEGER NOT NULL, package_qty INTEGER NOT NULL, total_cents INTEGER NOT NULL, dish_items TEXT NOT NULL, fulfillment TEXT NOT NULL, neighborhood TEXT, meal TEXT, status TEXT NOT NULL DEFAULT 'solicitado', payment TEXT NOT NULL DEFAULT 'na_entrega', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(customer_id) REFERENCES customers(id))"),
 db.prepare("CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id)"),
 db.prepare("CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at)")
 ]);
}
export function sameOrigin(request){const origin=request.headers.get("origin");return !origin||origin===new URL(request.url).origin}
export function configured(env){return Boolean(env?.DB&&env?.CUSTOMER_HASH_KEY&&env.CUSTOMER_HASH_KEY.length>=24)}
