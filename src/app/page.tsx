import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function Home() {
  const { data: courses } = await supabase
    .from('courses')
    .select('*, topics(*)');

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="border-b border-slate-800 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-blue-400">UniAI Platformu</h1>
          <p className="text-slate-400 mt-2">Universite Mufredatina Ozel Yapay Zeka Kocu</p>
        </header>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-slate-200">Aktif Dersler</h2>
          
          <div className="grid gap-6">
            {courses && courses.length > 0 ? (
              courses.map((course: any) => (
                <div key={course.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded text-sm font-bold">
                      {course.course_code}
                    </span>
                    <span className="text-xs text-slate-400">ITU - Bilgisayar Muhendisligi</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">{course.name}</h3>
                  
                  <div className="border-t border-slate-700/50 pt-4">
                    <h4 className="text-sm font-semibold text-slate-400 mb-3">Haftalik Konu Basliklari:</h4>
                    <ul className="space-y-2">
                      {course.topics && course.topics.sort((a: any, b: any) => a.week_number - b.week_number).map((topic: any) => (
                        <li key={topic.id} className="bg-slate-900/50 p-3 rounded border border-slate-800 flex items-start gap-3">
                          <span className="bg-slate-800 text-slate-300 text-xs font-bold px-2 py-1 rounded">
                            {topic.week_number}. Hafta
                          </span>
                          <div>
                            <p className="font-medium text-sm text-slate-200">{topic.title}</p>
                            <p className="text-xs text-slate-400 mt-1">{topic.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400">Henuz veritabaninda ders bulunamadi.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}