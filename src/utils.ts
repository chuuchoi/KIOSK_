
 export function animateCFX(e:React.MouseEvent){
  const tar = document.querySelector<HTMLDivElement>('#cfx-0')
  let scaleFactor = 1/Number(document.body.style.scale)
  let posX = scaleFactor * e.clientX 
  let posY = scaleFactor * e.clientY 
  if(!tar) return
  tar.style.display = 'block'
  tar.animate([
    {transform:`translate(${posX}px,${posY}px) scale(0)`},
    {transform:`translate(${posX}px,${posY}px) scale(1)`}
  ], {duration:400,easing:'ease-in',iterations:1,fill:'forwards'})
  tar.animate([
    {opacity:0.7},
    {opacity:0},
  ], {duration:400,delay:200,iterations:1,fill:'forwards'})
}
export function animatePrmStart(e:React.MouseEvent|React.TouchEvent){
  if(e.target instanceof HTMLElement){
    e.target.animate([
      {backgroundColor:'#F4F9FD'},
      {backgroundColor:'#E8F1F9'}
    ],{duration:300,easing:'ease-in',iterations:1,fill:'forwards'})
    const path = e.target.querySelector("path")
    if(path instanceof SVGElement){
      path.animate([
        {fill:'#C2DBF5'},
        {fill:'#B0D0F1'}
      ],{duration:300,easing:'ease-in',iterations:1,fill:'forwards'})
    }
  }
}
export function animatePrmEnd(e:React.MouseEvent|React.TouchEvent){
  if(e.target instanceof HTMLElement){
    e.target.animate([
      {backgroundColor:'#E8F1F9'},
      {backgroundColor:'#F4F9FD'}
    ],{duration:1000,easing:'ease-in',iterations:1,fill:'forwards'})
    const path = e.target.querySelector("path")
    if(path instanceof SVGElement){
      path.animate([
        {fill:'#B0D0F1'},
        {fill:'#C2DBF5'}
      ],{duration:1000,easing:'ease-in',iterations:1,fill:'forwards'})
    }
  }
}
export function animateBgStart(e:React.MouseEvent|React.TouchEvent){
  if(e.target instanceof HTMLElement){
    e.target.animate([
      {backgroundColor:'rgba(23, 25, 27, 0)'},
      {backgroundColor:'rgba(23, 25, 27, 0.1)'}
    ],{duration:300,easing:'ease-in',iterations:1,fill:'forwards'})
  }
}
export function animateBgEnd(e:React.MouseEvent|React.TouchEvent){
  if(e.target instanceof HTMLElement){
    e.target.animate([
      {backgroundColor:'rgba(23, 25, 27, 0.1)'},
      {backgroundColor:'rgba(23, 25, 27, 0)'}
    ],{duration:1000,easing:'ease-in',iterations:1,fill:'forwards'})
  }
}
export function chunkArray(array:Array<any>, size:number) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      result.push(chunk);
  }
  return result;
}