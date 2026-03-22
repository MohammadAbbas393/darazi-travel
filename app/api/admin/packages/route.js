import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase.from('packages').select('*').order('id');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data.map(r => ({ ...r, desc: r.description })));
}

export async function POST(req) {
  const body = await req.json();
  const item = { ...body, id: Date.now().toString(), description: body.desc };
  delete item.desc;
  const { data, error } = await supabase.from('packages').insert(item).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ...data, desc: data.description }, { status: 201 });
}

export async function PUT(req) {
  const body = await req.json();
  const item = { ...body, description: body.desc };
  delete item.desc;
  const { data, error } = await supabase.from('packages').update(item).eq('id', body.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ...data, desc: data.description });
}

export async function DELETE(req) {
  const { id } = await req.json();
  const { error } = await supabase.from('packages').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
