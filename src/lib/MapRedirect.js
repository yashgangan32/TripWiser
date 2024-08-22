const handleloc=(place,loc)=>{
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)},${encodeURIComponent(loc)}`, '_blank');
  }
export default handleloc