import React from 'react';

const UseCases = () => {
  return (
    <section className="py-20 px-6 lg:px-12 bg-slate-50 dark:bg-black/40">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-slate-900 dark:text-white">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqFlfzaSu3_JDgsvRueL_GGWJanKbBNm4LUzCA1Kkkt-a_XvAlHdnwESeOg1OZyUnkkzXLyjIldnf4grTbc0GDQ4Gxd0x4GObEuxH08Fo_fC01ZHNZz8vLbycPrVltayDVUulWg7kwNxDT1FKHQwjlvyAzWIgVJrApg8s-s76iMgv_mviOvjpOwPYZi6SkMiOkaZHvFLSsBKswky2zF0Hz7bPHsXVPQsBiIRxQ4O8LuK9mhL3jvTqVNJRM1mVEHyC-vCMNkNfsvQ", title: "Professional Trading" },
            { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQtlOAp7anFDML7K4O0vXPoAEtVq9hilHehkuuH4Qm3JRxuGNvDarn5rMimWSzG5MHy9lXMlLEuMqKcqV13uUtaxu3WdZt76BIf94-26BS9MtGjorBAOhd860lHYexdF7y1zJff5EBpnPQtwXj-rfPxCPKdwtBQ-S33Gzd2CdUG6SeYwLURUzfoym90xPdvegSL1CsWMF0vDqOHLje79BQGLDiEHCpJtzguHrDjIB8FwfTLhNGNXcsEuFQL3X75aqv0xF0L_ec6Q", title: "Community Insights" },
            { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaNrRC-wr4TXuqQmHuW9u5lsWdHG-ZOLk2BQoazH2J-JW-SB6ysk00OQSfw_YdA4WAmY3-DPNve8kJIb-hmsL_LsgRwioBVAPjcJz2GLlwN3L4XaM7lgh12Q8-qIeom8WoRvr98xHXz9neUVv05uxHHfM8bSlEqghaP4knNIQ3X-O3_t1-PLwvh9Bf1s7qxB7hY8kr3glQyvQ5Xs0iXmhAOnWEBhMgFbJ-GwgITl6w4SUNBbDbTzM5-5mys1IeuMZCSB4iuNUR0A", title: "Institutional Analysis" }
          ].map((item, index) => (
            <div key={index} className="group relative rounded-xl overflow-hidden shadow-xl aspect-video">
              <img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <span className="text-white font-semibold">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
