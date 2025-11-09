import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';


import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';




export default function Navbar(){






    return(




    <div className="bg-[#255799] w-1/4 h-full  relative overflow-auto">
        <div className="flex flex-row items-center">
            <img src="logo.png"  className=" h-2/3 w-2/3 "></img>
        <h1 className="text-[1.90vw] font-serif text-white font-extrabold overflow-hidden w-3/4" >Zot Rooms</h1></div>
    <h2 className="text-[1.10vw] font-serif text-white font-bold overflow-hidden w-3/4 w-full text-center" >Select Date</h2>


        <LocalizationProvider dateAdapter={AdapterDayjs}>
     
          <DateCalendar className="text-white"defaultValue={dayjs('2022-04-17')} />
       
    </LocalizationProvider>




    <h2 className="text-[1.10vw] font-serif text-white font-bold overflow-hidden w-3/4 w-full text-center" >Select Time</h2>
    <div className="w-full flex flex-row justify-center gap-7"> <input
        type="time"
        id="StartTime"/>


    <input
        type="time"
        id="StartTime"/> </div>


    <h2 className="text-[1.10vw] font-serif text-white font-bold overflow-hidden w-3/4 w-full text-center mt-5" >Select Location</h2>
   


    <FormGroup className='w-full  flex flex-col items-center'>
    <FormControlLabel control={<Checkbox defaultChecked />} label="Science Library" className='w-2/3 flex justify-start'/>
    <FormControlLabel control={<Checkbox defaultChecked />} label="Langson Library" className='w-2/3 flex justify-start'/>
    <FormControlLabel control={<Checkbox defaultChecked />} label="Gateway Study Center" className='w-2/3 flex justify-start'/>
    <FormControlLabel control={<Checkbox defaultChecked />} label="Multimedia Resources Center" className='w-2/3 flex justify-start'/>
    <FormControlLabel control={<Checkbox defaultChecked />} label="Grunigen Medical Library" className='w-2/3 flex justify-start'/>
    </FormGroup>
   
   


    </div>




    )
}
