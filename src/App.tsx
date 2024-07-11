import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { ArrowIcon, BackIcon, ErrorIcon, MainIcon, MinusIcon, NetErrSVG, PaymentSVG, PlusIcon, PremiumIcon, PrmBtn, ReceiptSVG, XIcon } from './svg';
import Carousel  from '@itseasy21/react-elastic-carousel';
import { debounce } from 'throttle-debounce';
import { dessert_data, food_data, noodle_data } from './dummy';
import { animateBgEnd, chunkArray, animateBgStart, animateCFX, animatePrmStart, animatePrmEnd} from './utils';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Renderer from './Renderer';

let dummyData = [noodle_data, food_data, dessert_data]

const MotionLink = motion(Link)
const [MotionSlideDown, MotionSlideDownA, MotionSlideDownT]=[
  {opacity:0,transform:'translateY(-24px)'},
  {opacity:1,transform:'translateY(0px)'},
  {duration:0.7,delay:0.5},
]
const [MotionModalUp, MotionModalUpA]=[
  {transform:'translateY(100%)'},
  {transform:'translateY(0px)'}
]

let recNum = 422;
let toId:NodeJS.Timeout
let isDOMMounted =false
function App() {
  const [isTrans, setIsTrans] = useState(false) //to do: distinguish refresh from page transition animation
  useEffect(()=>{
    if(!isDOMMounted){
      window.onresize = debounce(400,()=>{
        let ratio = (visualViewport?.width||0)/1920
        // console.log(visualViewport?.width, ratio)
        document.body.style.scale = String(ratio);
      })
      let ratio = (visualViewport?.width||0)/1920
      // console.log(visualViewport?.width, ratio)
      document.body.style.scale = String(ratio);
    }
    isDOMMounted = true
  },[])

  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main isTrans={isTrans} setIsTrans={setIsTrans}/>}/>
      <Route path='/premium' element={<Premium isTrans={isTrans} setIsTrans={setIsTrans}/>}/>
      <Route path='*' element={<Main isTrans={isTrans} setIsTrans={setIsTrans}/>}/>
    </Routes>
    </BrowserRouter>
  )
}

function Main({isTrans,setIsTrans}:CompProps) {
  const [data, setData] = useState<Menu[]>([])
  const [curTap, setCurTap] = useState(0)
  const [curPage, setCurPage] = useState(0)
  const [bag, setBag] = useState<Bag>({})
  const [mdown,setMdown] = useState<{ x: number; y: number } | null>(null);
  const recRef = useRef<any>(null)
  const lbtnRef = useRef<HTMLButtonElement|null>(null)
  const rbtnRef = useRef<HTMLButtonElement|null>(null)

  const [showModal, setShowModal] = useState(false)
  const [paymentStage, setPaymentStage] = useState<number>()

  const maxPage = useMemo(()=>{
    return Math.floor((data.length-1)/8)
  },[data])

  const totalPrice = useMemo(()=>{
    let tp = 0
    for(let v of Object.values(bag)){
      tp +=v.price * v.count
    }
    return tp
  },[bag])

  const addMenu = useCallback((menu:Menu)=>{
    setBag((prevBag)=>{
      const newBag = {...prevBag}
      if(newBag[menu.name]){
        newBag[menu.name].count += 1;
      }else newBag[menu.name]={name:menu.name,price:menu.price,count:1}
      return newBag
    })
  },[])
  const deductMenu = useCallback((menu:Menu)=>{
    setBag((prevBag)=>{
      const newBag = {...prevBag}
      if(newBag[menu.name]){
        if(newBag[menu.name].count === 1) delete newBag[menu.name]
        else newBag[menu.name].count -= 1;
      }
      return newBag
    })
  },[])
  const deleteMenu = useCallback((menu:Menu)=>{
    setBag((prevBag)=>{
      const newBag = {...prevBag}
      if(newBag[menu.name]){
        delete newBag[menu.name]
      }
      return newBag
    })
  },[])

  useEffect(()=>{
    if(isTrans){}
      const lbtn:HTMLButtonElement|null = document.querySelector(".rec.rec-arrow-left")
      if(lbtn){
        lbtnRef.current = lbtn
        lbtn.style.display="none"
      }
      const rbtn:HTMLButtonElement|null = document.querySelector(".rec.rec-arrow-right")
      if(rbtn){
        rbtnRef.current = rbtn
        rbtn.style.display="none"
      }
      const pbtns:HTMLButtonElement|null = document.querySelector(".rec.rec-pagination")
      if(pbtns)pbtns.style.display="none"
  },[])

  useEffect(()=>{
    const recSlider:HTMLDivElement|null = document.querySelector(".rec-slider")
    if(recSlider)recSlider.style.transition = 'null'
    recRef.current?.goTo(0)
    if(recSlider)setTimeout(() => {
      recSlider.style.transition = 'all 500ms ease 0s'
    }, 30);
  
    const recWrapper = document.querySelector(".rec-item-wrapper")
    if(recWrapper){recWrapper.animate([MotionSlideDown,MotionSlideDown, MotionSlideDownA],{duration:500,delay:0,iterations:1,fill:'forwards'})}
    setCurPage(0)
    setData(dummyData[curTap])
  },[curTap])

  useEffect(()=>{
    if(paymentStage === 0){
      toId = setTimeout(() => {
        setPaymentStage(1)
      }, 4444);
    }
    if(paymentStage === 2){
      setTimeout(() => {
        setBag({})
        setShowModal(false)
        setPaymentStage(undefined)
      }, 5555);
    }
  },[paymentStage])

  return (
    <div className="main" onClick={(e)=>{animateCFX(e)}}>
      <div id='cfx-0' />
      <div style={{flex:'1',height:'100%'}}>
        <div className='rtg10ma'><div className='rtg10'/> </div> 
        <AnimatePresence initial={true}>
        <MotionLink to={'/premium'} style={{scale:'1'}} className='prm-btn' onTouchStart={animatePrmStart} onTouchEnd={animatePrmEnd}
        onMouseDown={animatePrmStart} onMouseUp={animatePrmEnd}
        initial={{width:'202.58px', backgroundColor:'#C2DBF5'}}
        animate={{width:'312px', backgroundColor:'#F4F9FD'}}
        exit={{width:'500px',backgroundColor:'red'}}>

          <PremiumIcon style={{marginLeft:'28px'}}/>
          <span>Premium</span>
        </MotionLink>
        </AnimatePresence>
        
        <MainIcon className='micona' style={{position:'absolute',top:'18px',left:'670px',}}/>
<motion.div initial={MotionSlideDown} animate={MotionSlideDownA} transition={MotionSlideDownT}>
        <p className='menut0'>
          <span onTouchStart={animateBgStart}
                onTouchEnd={animateBgEnd}
                style={{color:curTap===0?'#005CA2':''}}
                //onContextMenu : long press in mobile
                onContextMenu={({target})=>{(target as HTMLElement).click()}}
                onClick={()=>{setCurTap(0)}}>
                  면류</span>
          <span onTouchStart={animateBgStart}
                onTouchEnd={animateBgEnd}
                style={{color:curTap===1?'#005CA2':''}}
                onContextMenu={({target})=>{(target as HTMLElement).click()}}
                onClick={()=>{setCurTap(1)}}>
                  식사류</span>
          <span onTouchStart={animateBgStart}
                onTouchEnd={animateBgEnd}
                style={{color:curTap===2?'#005CA2':''}}
                onContextMenu={({target})=>{(target as HTMLElement).click()}}
                onClick={()=>{setCurTap(2)}}>
                  후식</span>
        </p>

        <div style={{width:'87%',margin:'auto',position:'relative',background:'#F4F9FD',height:'800px'}}>
          <Carousel isRTL={false} ref={recRef} onChange={(e)=>{setCurPage(e.index)}}>
            {chunkArray(data,8).map((data:Menu[],idx:number)=>
            <div className='reci0' key={idx}>
              {data.map((item,idx)=>
              <div key={idx} onTouchStart={animateBgStart} onTouchEnd={animateBgEnd}
                onMouseDown={(e)=>{
                  //[mdown, setMdown] : to distinguish a click from a swipe  
                  setMdown({x:e.clientX, y:e.clientY})
                }}
                onContextMenu={({target})=>{(target as HTMLElement).click()}}
                onClick={(e)=>{
                  if(mdown===null) return;
                  let yWeight = 0.4 //bigger y axis tolerance
                  let d = Math.sqrt(Math.pow(Math.abs(e.clientX-mdown.x), 2) + Math.pow(Math.abs(e.clientY-mdown.y)*yWeight, 2))
                  if(d>10) return //skip click event if distance is bigger than 10
                  addMenu(data[idx])
                }}>
                <img src={item.img} width={200}/>
                <p>
                  {item.name}<br/>
                  <span>
                  {item.price.toLocaleString()}
                  </span>
                </p>
              </div>)}
            </div>)}
          </Carousel>
          <div className='cgrd0' style={{left:'0',rotate:"180deg"}} />
          <div className='cgrd0' style={{right:'0'}} />
          
          {maxPage!==0&&<>
          <div onClick={()=>{lbtnRef.current?.click()}}>
            <ArrowIcon disabled={curPage===0}
              style={{cursor:'pointer',position:'absolute',top:'368px',left:'-8px', rotate:'180deg',
              pointerEvents:curPage===0?'none':'auto'}}/>
          </div>
          <div onClick={()=>{rbtnRef.current?.click()}}>
            <ArrowIcon disabled={curPage===maxPage}
              style={{cursor:'pointer',position:'absolute',top:'368px',right:'-8px',
              pointerEvents:curPage===maxPage?'none':'auto'}}/>
          </div></>}
        </div>
</motion.div>     
        <div className='rtg11'><div /></div>
        <motion.div className='rtg11-1' initial={MotionSlideDown} animate={MotionSlideDownA} transition={MotionSlideDownT}/>

      </div>

      <motion.div style={{background:'#F4F9FD', width:'509px', height:'100%',position:'relative'}}
      initial={MotionSlideDown}
      animate={MotionSlideDownA}
      transition={MotionSlideDownT}>
        <div className='rtg12'><div /></div>

        <div className='bagcontn'>
          <p className='mcp0'>
            <span style={{position:'relative', left:'11px'}}>메뉴</span>
            <span style={{position:'absolute', right:'178px'}}>수량</span>
            <span style={{position:'absolute', right:'48px'}}>가격</span>
          </p>
          <ul className='ul-bag0'>
            {Object.values(bag).map((item, idx)=>
              <li key={idx} style={{borderTop:idx==0?'':'1px solid #E6E6E6'}}>
              <p style={{paddingLeft:'10px',margin:'0',width:'100%'}}>
                <span style={{fontSize:'25px',fontWeight:'500',display:'inline-block',width:'162px',wordWrap:'break-word'}}>
                {item.name}
                </span>
              </p>
              <div style={{right:'178px', justifyContent: 'center'}}>
                <div className='iconbtn-0' style={{position:'absolute',right:'21px'}}
                  onClick={()=>{
                    deductMenu(item)
                  }}><MinusIcon/></div>
                <span style={{margin:'0',width:'44px',wordWrap:'break-word'}}>
                {item.count.toLocaleString()}
                </span>
                <div className='iconbtn-0' style={{position:'absolute',left:'20px'}}
                  onClick={()=>{
                    addMenu(item)
                  }}><PlusIcon/></div>
              </div>
              <div style={{right:'-4px', justifyContent: 'end'}}>
                <span style={{position:'relative', right:'-4px',textAlign:'end', width:'98px', wordWrap:'break-word'}}>
                {(item.price*item.count).toLocaleString()}
                </span>
                <div className='iconbtn-0'
                  onClick={()=>{
                    deleteMenu(item)
                  }}><XIcon/></div>
              </div>
              </li>)}
          </ul>
        </div>
        {totalPrice!==0&&
        <p className='ptp0'>
          주문 금액 : <span>{totalPrice.toLocaleString()}</span><span> 원</span>
        </p>}
        
        <div className='btn-g00'>
          <button tabIndex={-1} className='btn-s01'
            onContextMenu={({target})=>{(target as HTMLElement).click()}}
            onClick={()=>{
              setBag({})
            }}>전체 취소</button>
          <button tabIndex={-1} className='btn-s00'
            onContextMenu={({target})=>{(target as HTMLElement).click()}}
            onClick={()=>{
              setPaymentStage(0)
              if(totalPrice!==0)
                setShowModal(true)
            }}>결제 하기</button>
        </div>
      </motion.div>

      {showModal&&<div className='payment-modal'>
      <motion.div className='pm-stg0' initial={MotionModalUp} animate={MotionModalUpA}
        onClick={()=>{
          if(paymentStage ===0){
            recNum ++
            setPaymentStage(2)
            clearTimeout(toId)
          }
        }}>
          {paymentStage === 0 &&<>
              <motion.div className='stg0-h' initial={MotionSlideDown} animate={MotionSlideDownA} transition={MotionSlideDownT}>
                신용카드 결제
              </motion.div>
              <motion.p className='stg0-p' initial={MotionSlideDown} animate={MotionSlideDownA} transition={MotionSlideDownT}>
                결제가 완료되었다는 메시지가 보일 때까지<br/>
                카드를 제거하지 말아 주세요.
              </motion.p>
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}}>
                <PaymentSVG />
              </motion.div>
              <motion.span className='stg0-sp' initial={MotionSlideDown} animate={MotionSlideDownA} transition={MotionSlideDownT}>
                카드를 윗면이 보이게 넣어주세요
              </motion.span>
              <button onClick={(e)=>{e.stopPropagation();setShowModal(false);setPaymentStage(undefined);clearTimeout(toId)}}>
                취소</button>
          </>}
          {paymentStage === 1 &&<>
              <div className='stg0-h' style={{color:'#F23F3F'}}>
                <ErrorIcon style={{marginRight:'12px'}} />
                결제 오류
              </div>
              <p className='stg0-p'>승인 실패</p>
              <NetErrSVG />
              <span className='stg0-sp' style={{marginTop:'60px',color:'#F23F3F'}}>네트워크 연결 상태를 확인하세요</span>
              <button className='errbtn' onClick={()=>{setShowModal(false)}}>확인</button>
          </>}
          {paymentStage === 2 &&<>
              <div className='stg0-h'>결제 완료</div>
              <p className='stg0-p'>결제가 완료되었습니다.</p>
              <ReceiptSVG num={recNum} />
              <span className='stg0-sp' style={{marginTop:'60px'}}>영수증을 꼭 가져가세요</span>
          </>}

      </motion.div>
      </div>}

      {!showModal&&<motion.div key={1} layoutId='test00' style={{transition:'2.3s all ease',position:'absolute',scale:'1',top:`${showModal?'333px':'0px'}`,left:'600px',background:'rgba(222,0,0,0.7)', width:'300px',height:'300px'}}
         >
        test</motion.div>}
      {showModal&&<motion.div key={1} layoutId='test00' style={{transition:'2.3s all ease',position:'absolute',scale:'2',top:`${showModal?'333px':'0px'}`,left:'900px',background:'rgba(222,0,0,0.7)', width:'120px',height:'120px'}}
         >
        test</motion.div>}


    </div>
  );
}



function Premium({isTrans,setIsTrans}:CompProps) {
  const [showBGAni, setShowBGAni] = useState(false)
  useEffect(()=>{
    let to = setTimeout(() => {
      setShowBGAni(true)
    }, 1400);
    return ()=>{clearTimeout(to)}
  },[])

  //shader test
  useEffect(()=>{
      new Renderer({
        width: 512,
        height: 512,
      });
    
    const canvas = document.getElementsByTagName("canvas")
    const ctx = canvas[0]?.getContext("2d")
    if(ctx){
      // Set line width
ctx.lineWidth = 10;
// Wall
ctx.strokeRect(75, 140, 150, 110);

// Door
ctx.fillRect(130, 190, 40, 60);

// Roof
ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();
    }
  },[])
  return(
    <div className="main prm" onClick={(e)=>{animateCFX(e)}}>
      <div id='cfx-0' />
      <div style={{flex:'1',height:'100%'}}>
        {!showBGAni&&
          <div className='rtg10 prm' />}
        {showBGAni&&<motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:3}}>
          <div className='rtg-prm10'/>
          <div className='rtg-prm10-1'/>
          <div className='rtg-prm10-2'/>
        </motion.div>}
        <MotionLink to={'/'} className='prm-btn prm' onClick={()=>{setIsTrans((c)=>!c)}}
            initial={{width:'312px', backgroundColor:'#F4F9FD'}}
            animate={{width:'202.58px', backgroundColor:'#C2DBF5'}}>
          <BackIcon/> <span>Back</span>
        </MotionLink>

        <MainIcon className='micona prm' style={{position:'absolute',top:'18px',left:'670px',}}/>

        <motion.p className='prmh-t'
          initial={MotionSlideDown}
          animate={MotionSlideDownA}
          transition={MotionSlideDownT}>
          프리미엄 서비스 등록<br/>
          <span style={{fontSize:'32px',fontWeight:'600'}}>Upgrade to Premium</span>
        </motion.p>
        {/* <img className='prmbtn-s' src='/Group 11.png' width={335.76} /> */}
        <motion.div className='prmbtn-s' 
          initial={MotionSlideDown}
          animate={MotionSlideDownA}
          transition={MotionSlideDownT}>
          <PrmBtn/>
        </motion.div>
      </div>
      
      {/* <motion.div key={1} layoutId='test00' style={{transition:'.3s all linear',position:'absolute',scale:'1',top:'30px',left:'300px',background:'rgba(211,22,22,0.5)', width:'600px',height:'600px'}}
         >
        <canvas width={300} height={300} style={{background:"rgba(255,255,255,0.7)"}}></canvas>
      </motion.div> */}

    </div>
  )
}

export default App;
