import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, Target, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../constants';
import { EtheralShadow } from '../components/ui/EtheralShadow';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">

      {/* --- Intro / Hero --- */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-4 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <EtheralShadow
            color="#BAE6FD"
            animation={{ scale: 60, speed: 15 }}
            noise={{ opacity: 0.05, scale: 0.5 }}
            sizing="stretch"
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-[#004e82] text-xs font-bold uppercase tracking-widest mb-6">
              Das sind wir
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Wir geben Vertrieb ein <br /><span className="text-[#004e82]">neues Zuhause.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              MQ-Connect steht für die neue Generation des Direktvertriebs.
              Keine Ellbogen-Mentalität, sondern echte Beratung, echte Werte und echter Erfolg.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- VISION SECTION (Reference: Werde Teil unserer Vision) --- */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] group">
                <img
                  src="/images/vision-team.jpg"
                  alt="Team Vision Meeting"
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#004e82]/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>

            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 uppercase tracking-tight leading-tight">
                Werde Teil unserer <span className="text-[#004e82] italic">Vision</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                <p>
                  Unsere Vision ist es, den Door-to-Door Vertrieb in Deutschland wieder <span className="text-slate-900 font-bold">„salonfähig“</span> zu machen.
                </p>
                <p>
                  Wir möchten durch qualitative und ehrliche Beratung das Negativimage vom Türverkauf umdrehen. Durch uns soll in der ganzen Bundesrepublik wieder jeder seriös an der Tür kaufen können, ohne Angst vor Abzocke.
                </p>
                <p>
                  Dafür stehen wir mit unserem Namen: Maximale Transparenz für den Kunden und maximale Fairness für unsere Mitarbeiter.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- FOUNDER SECTION (Reference: Über den Gründer) --- */}
      <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 translate-x-32 hidden lg:block"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-[#004e82] font-bold uppercase tracking-widest text-xs mb-4">
                <span className="w-8 h-[2px] bg-[#004e82]"></span>
                Leadership
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 uppercase tracking-tight">
                Über den <span className="text-[#004e82] italic">Gründer</span>
              </h2>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                <p>
                  <strong>Milan Jasieniecki</strong> ist Gründer und Geschäftsführer von MQ-Connect. Er gilt als einer der Vorreiter im modernen Door-to-Door Geschäft in Nordrhein-Westfalen.
                </p>
                <p>
                  Er hat das Handwerk von der Pike auf gelernt. Keine Theorie aus dem Lehrbuch, sondern jahrelange Praxis an der Haustür. Er hat hunderte Mitarbeiter ausgebildet und Teams zum Erfolg geführt, die heute Branchen-Benchmarks setzen.
                </p>
                <p>
                  Sein Ansatz: Er motiviert und trainiert nicht nur vom Schreibtisch aus, sondern lebt vor, was möglich ist. Sein Ziel ist es, MQ-Connect zur ersten Anlaufstelle für ambitionierte Vertriebstalente in Deutschland zu machen.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="text-3xl font-black text-[#004e82] mb-1">Top 1%</div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Performance</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="text-3xl font-black text-[#004e82] mb-1">100%</div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Praxis-Knowhow</div>
                </div>
              </div>
            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl border-4 border-white">
                <img
                  src="/images/team/founder.png"
                  alt="Milan Jasieniecki"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />

                {/* Name Badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent p-8 pt-24 text-white">
                  <h3 className="text-2xl font-bold">Milan Jasieniecki</h3>
                  <p className="text-slate-300 font-medium">Geschäftsführer MQ-Connect</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg animate-bounce duration-[3000ms]">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- MISSION SECTION (Reference: Unsere Mission ist klar) --- */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 uppercase tracking-tight leading-tight">
                Unsere <span className="text-[#004e82] italic">Mission</span> ist klar
              </h2>

              <div className="prose prose-lg text-slate-600 mb-8 leading-relaxed">
                <p className="mb-4">
                  MQ-Connect aus <strong>{APP_CONFIG.LOCATION}</strong> in NRW ist eines der erfolgreichsten und am schnellsten wachsenden Vertriebsunternehmen der Region.
                </p>
                <p className="mb-4">
                  Unsere Devise – die Vermittlung von Strom, Gas sowie Glasfaserverträgen, Telekommunikation-Produkten und PV-Anfragen bei maximalem Mehrwert für den Kunden.
                </p>
                <p>
                  Praxiswissen, über <span className="text-slate-900 font-bold border-b-2 border-yellow-400">9.500+ Neukunden</span> und maximal zufriedene Mitarbeiter – worauf wartest du also?
                </p>
              </div>

              <Link to="/bewerben">
                <Button size="lg" className="px-10 py-4 text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                  JETZT BEWERBEN
                </Button>
              </Link>
            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 aspect-video group">
                <img
                  src="/images/office.jpg"
                  alt="MQ Connect Team Mission"
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Box */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg max-w-[200px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-100 p-1.5 rounded-lg">
                      <Target className="w-5 h-5 text-[#004e82]" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">Fokus</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Wir konzentrieren uns auf das, was wir am besten können: Kunden begeistern.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- VALUES GRID (Quick Summary) --- */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Ehrlichkeit", icon: <CheckCircle2 className="w-6 h-6 text-green-500" />, desc: "Keine leeren Versprechen. Wir sagen, was Sache ist." },
              { title: "Wachstum", icon: <TrendingUp className="w-6 h-6 text-blue-500" />, desc: "Wir stagnieren nicht. Jeden Tag werden wir 1% besser." },
              { title: "Gemeinschaft", icon: <Users className="w-6 h-6 text-purple-500" />, desc: "Wir gewinnen zusammen und wir lernen zusammen." }
            ].map((val, i) => (
              <Card key={i} className="bg-white border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{val.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">{val.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};