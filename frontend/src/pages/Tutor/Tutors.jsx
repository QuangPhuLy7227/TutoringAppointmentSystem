import TutorCard from './../../components/Tutors/TutorCard'
import { doctors } from './../../assets/data/doctors'
import Testimonial from '../../components/Testimonial/Testimonial';

import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useState } from 'react';

const Tutors = () => {
  const [query, setQuery] = useState('');
  const { data:tutors, loading, error } = useFetchData(`${BASE_URL}/tutors`);
  return (
    <>
      <section className='bg-[#fff9ea]'>
        <div className="container text-center">
          <h2 className='heading'>Find Your Tutor</h2>
          <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
            <input type="search" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor' placeholder="Search Tutor by name or specification" value={query} onChange={e => setQuery(e.target.value)} />
            <button className='btn mt-0 rounded-[0px] rounded-r-md'>Search</button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {tutors.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} />)}
          </div>)}
        </div>
      </section>

      <section>
      <div className="container">
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>What our students say</h2>
            <p className='text_para text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent.</p>
          </div>

          <Testimonial />
        </div>
      </section>
    </>
  )
}

export default Tutors;