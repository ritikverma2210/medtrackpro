export default function Stats(){

return(

<section className="py-20 text-center bg-[#020617] text-white">

<h2 className="text-3xl font-bold mb-10">
Platform Stats
</h2>

<div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

<div>
<h3 className="text-4xl text-blue-400 font-bold">500+</h3>
<p className="text-gray-400">Doctors</p>
</div>

<div>
<h3 className="text-4xl text-blue-400 font-bold">1200+</h3>
<p className="text-gray-400">MR Visits</p>
</div>

<div>
<h3 className="text-4xl text-blue-400 font-bold">3000+</h3>
<p className="text-gray-400">DCR Reports</p>
</div>

<div>
<h3 className="text-4xl text-blue-400 font-bold">99.9%</h3>
<p className="text-gray-400">System Uptime</p>
</div>

</div>

</section>

)

}