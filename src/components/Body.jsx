import React, {useState} from 'react'
import "./Body.css"

function Body() {
    const [calcType, setCalcType] = useState('average');
    const [numberExams, setNumberExams] = useState('one');
    const [needPoint, setNeedPoint] = useState('');
    const [exam1, setExam1] = useState('');
    const [exam2, setExam2] = useState('');
    const [exam3, setExam3] = useState('');
    const [final, setFinal] = useState('');
    const [rate1, setRate1] = useState('');
    const [rate2, setRate2] = useState('');
    const [rate3, setRate3] = useState('');
    const [rateFinal, setRateFinal] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleCType = (e) => {
        setCalcType(e.target.value);
        //clear
        setExam1('');
        setExam2('');
        setExam3('');
        setFinal('');
        setRate1('');
        setRate2('');
        setRate3('');
        setRateFinal('');


    } 
    const handleNumberExams = (f) => {
        setNumberExams(f.target.value);
        //clear
        setExam1('');
        setExam2('');
        setExam3('');
        setFinal('');
        setRate1('');
        setRate2('');
        setRate3('');
        setRateFinal('');
    }

    const hesapla = async () => {
        setLoading(true);

        let ex1 = Number(exam1);
        let ex2 = Number(exam2);
        let ex3 = Number(exam3);
        let exFinal = Number(final);
        let rt1 = Number(rate1);
        let rt2 = Number(rate2);
        let rt3 = Number(rate3);
        let rtFinal = Number(rateFinal);

        if(calcType === 'average'){
            if(numberExams === 'one'){
                if(rt1 + rtFinal === 100){
                    if(exam1 === '' ||final === ''){
                        setLoading(false);
                        setResult('Gerekli alanları doldurunuz.');
                        return;
                    }
                    else{
                        await pause(1000);
                        setLoading(false);
                        const result = ex1 * rt1 / 100 + exFinal * rtFinal / 100;
                        setResult('Ortalama: ' + result.toFixed(1));
                    }
                }
                else{
                    setLoading(false);
                    setResult('Yüzdelik oranları doğru girmelisiniz.')
                    return; 
                }
            }else if(numberExams === 'two'){
                if(rt1 + rt2 + rtFinal === 100){
                    if(exam1 === '' || exam2 ==='' || final === ''){
                        setLoading(false);
                        setResult('Gerekli alanları doldurunuz.');
                        return;
                    }
                    else{
                        await pause(1000);
                        setLoading(false);
                        const result = ex1 * rt1 / 100 + ex2 * rt2 / 100 + exFinal * rtFinal / 100;
                        setResult('Ortalama: ' + result.toFixed(1));
                    }
                }
                else{
                    setLoading(false);
                    setResult('Yüzdelik oranları doğru girmelisiniz.')
                    return; 
                }
            }else if(numberExams === 'three'){
                if(rt1 + rt2 + rt3 + rtFinal === 100){
                    if(exam1 === '' || exam2 ==='' || exam3 === '' || final === ''){
                        setLoading(false);
                        setResult('Gerekli alanları doldurunuz.');
                        return;
                    }
                    else{
                        await pause(1000);
                        setLoading(false);
                        const result = ex1 * rt1 / 100 + ex2 * rt2 / 100 + ex3 * rt3 / 100 + exFinal * rtFinal / 100;
                        setResult('Ortalama: ' + result.toFixed(1));
                    }
                }
                else{
                    setLoading(false);
                    setResult('Yüzdelik oranları doğru girmelisiniz.')
                    return; 
                }
            }
        }
        else if(calcType === 'finalPoint'){
            if(numberExams === 'one'){
                if(rt1 < 100 && rt1 > 0){
                    await pause(1000);
                    setLoading(false);
                    const result = (needPoint - ex1 * rt1 / 100) * 100 / (100-rt1);
                    setResult('Gereken minimum puan: ' + result.toFixed(1));
                }else{
                    setLoading(false);
                    setResult('Yüzdelik oranları doğru girmelisiniz.')
                    return; 
                }
            }else if(numberExams === 'two'){
                if(rt1 < 100 && rt1 > 0  && rt2 < 100 && rt2 > 0 && rt1 + rt2 < 100){
                    await pause(1000);
                    setLoading(false);
                    const result = (needPoint - ex1 * rt1 / 100 - ex2 * rt2 / 100) * 100 / (100-rt1-rt2);
                    setResult('Gereken minimum puan: ' + result.toFixed(1));
                }else{
                    setLoading(false);
                    setResult('Yüzdelik oranları doğru girmelisiniz.')
                    return; 
                }
            }else if(numberExams === 'three'){
                if(rt1 < 100 && rt1 > 0  && rt2 < 100 && rt2 > 0 && rt3 < 100 && rt3 > 0 && rt1 + rt2 + rt3 < 100){
                    await pause(1000);
                    setLoading(false);
                    const result = (needPoint - ex1 * rt1 / 100 - ex2 * rt2 / 100 - ex3 * rt3 / 100) * 100 / (100 - rt1 - rt2 - rt3);
                    setResult('Gereken minimum puan: ' + result.toFixed(1));
                }else{
                    setLoading(false);
                    setResult('Yüzdelik oranları doğru girmelisiniz.')
                    return; 
                }
            }
        }
    } 

  return (
    <>
        <h1 className='title'>VİZE FİNAL HESAPLAMA</h1>
        <div className='container'>
            <div className='calc-type'>
                <label>
                    <input 
                    type="radio" 
                    name='calc-type'
                    value='average'
                    checked={calcType === 'average'}
                    onChange={handleCType}
                    required
                    />
                    Vize Final Ortalaması
                </label>
                <label>
                    <input 
                    type="radio" 
                    name='calc-type'
                    value='finalPoint'
                    checked={calcType === 'finalPoint'}
                    onChange={handleCType}
                    required
                    />
                    Geçmek için gereken puan
                </label>
            </div>
            <div className='numberExams'>
                <label>
                    <input 
                    type="radio" 
                    name='numberExams'
                    value='one'
                    checked={numberExams === 'one'}
                    onChange={handleNumberExams}
                    required
                    />
                    1 Vize
                </label>
                <label>
                    <input 
                    type="radio" 
                    name='numberExams'
                    value='two'
                    checked={numberExams === 'two'}
                    onChange={handleNumberExams}
                    required
                    />
                    2 Vize
                </label>    
                <label>
                    <input 
                    type="radio" 
                    name='numberExams'
                    value='three'
                    checked={numberExams === 'three'}
                    onChange={handleNumberExams}
                    required
                    />
                    3 Vize
                </label>
            </div>

            {(calcType === 'average')&&(
                <>
                    <div className='input-box'>
                        <div className='input-border-box'>
                            <input 
                                placeholder='Vize 1'
                                type="number"
                                name='exam1'
                                value={exam1}
                                onChange={(e) => setExam1(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </div>
                        <div className='input-border-box'>
                            <input
                                placeholder='Oran' 
                                type="number" 
                                name='rate1'
                                value={rate1}
                                onChange={(e) => setRate1(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </div>
                    </div>
                    {(numberExams === 'one')&&(
                        <></>
                    )}
                    {(numberExams === 'two')&&(
                        <>
                             <div className='input-box'>
                        <div className='input-border-box'>
                            <input 
                                placeholder='Vize 2'
                                type="number"
                                name='exam2'
                                value={exam2}
                                onChange={(e) => setExam2(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </div>
                        <div className='input-border-box'>
                            <input
                                placeholder='Oran' 
                                type="number" 
                                name='rate2'
                                value={rate2}
                                onChange={(e) => setRate2(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </div>
                    </div>
                        </>
                    )}
                    {(numberExams === 'three')&&(
                        <>
                            <div className='input-box'>
                                <div className='input-border-box'>
                                    <input 
                                        placeholder='Vize 2'
                                        type="number"
                                        name='exam2'
                                        value={exam2}
                                        onChange={(e) => setExam2(e.target.value)}
                                        required
                                    />
                                    <span className="input-border"></span>
                                </div>
                                <div className='input-border-box'>
                                    <input
                                        placeholder='Oran' 
                                        type="number" 
                                        name='rate2'
                                        value={rate2}
                                        onChange={(e) => setRate2(e.target.value)}
                                        required
                                    />
                                    <span className="input-border"></span>
                                </div>
                            </div>
                            <div className='input-box'>
                                <div className='input-border-box'>
                                    <input 
                                        placeholder='Vize 3'
                                        type="number"
                                        name='exam3'
                                        value={exam3}
                                        onChange={(e) => setExam3(e.target.value)}
                                        required
                                    />
                                    <span className="input-border"></span>
                                </div>
                                <div className='input-border-box'>
                                    <input
                                        placeholder='Oran' 
                                        type="number" 
                                        name='rate3'
                                        value={rate3}
                                        onChange={(e) => setRate3(e.target.value)}
                                        required
                                    />
                                    <span className="input-border"></span>
                                </div>
                            </div>
                        </>
                    )}
                    <div className='input-box'>
                        <div className='input-border-box'>
                            <input 
                                placeholder='Final'
                                type="number"
                                name='final'
                                value={final}
                                onChange={(e) => setFinal(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </div>
                        <div className='input-border-box'>
                            <input
                                placeholder='Oran' 
                                type="number" 
                                name='rateFinal'
                                value={rateFinal}
                                onChange={(e) => setRateFinal(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </div>
                    </div>
                </>
            )}
            {(calcType === 'finalPoint')&&(
                <>
                    <div className='input-box'>
                        <div className='input-border-box'>
                            <input 
                                placeholder='Geçme Puanı'
                                type="number"
                                name='needPoint'
                                value={needPoint}
                                onChange={(e) => setNeedPoint(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </div>
                    </div>
                    <div className='input-box'>
                        <div className='input-border-box'>
                            <input 
                                placeholder='Vize 1'
                                type="number"
                                name='exam1'
                                value={exam1}
                                onChange={(e) => setExam1(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </div>
                        <div className='input-border-box'>
                            <input
                                placeholder='Oran' 
                                type="number" 
                                name='rate1'
                                value={rate1}
                                onChange={(e) => setRate1(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </div>
                    </div>
                    {(numberExams === 'one')&&(
                        <></>
                    )}
                    {(numberExams === 'two')&&(
                        <>
                            <div className='input-box'>
                                <div className='input-border-box'>
                                    <input 
                                        placeholder='Vize 2'
                                        type="number"
                                        name='exam2'
                                        value={exam2}
                                        onChange={(e) => setExam2(e.target.value)}
                                        required
                                    />
                                    <span className="input-border"></span>
                                </div>
                                <div className='input-border-box'>
                                    <input
                                        placeholder='Oran' 
                                        type="number" 
                                        name='rate2'
                                        value={rate2}
                                        onChange={(e) => setRate2(e.target.value)}
                                        required
                                    />
                                    <span className="input-border"></span>
                                </div>
                            </div>
                        </>
                    )}
                    {(numberExams === 'three')&&(
                        <>
                            <div className='input-box'>
                                <div className='input-border-box'>
                                    <input 
                                        placeholder='Vize 2'
                                        type="number"
                                        name='exam2'
                                        value={exam2}
                                        onChange={(e) => setExam2(e.target.value)}
                                        required
                                    />
                                    <span className="input-border"></span>
                                </div>
                                <div className='input-border-box'>
                                    <input
                                        placeholder='Oran' 
                                        type="number" 
                                        name='rate2'
                                        value={rate2}
                                        onChange={(e) => setRate2(e.target.value)}
                                        required
                                    />
                                    <span className="input-border"></span>
                                </div>
                            </div>
                            <div className='input-box'>
                                <div className='input-border-box'>
                                    <input 
                                        placeholder='Vize 3'
                                        type="number"
                                        name='exam3'
                                        value={exam3}
                                        onChange={(e) => setExam3(e.target.value)}
                                        required
                                    />
                                    <span className="input-border"></span>
                                </div>
                                <div className='input-border-box'>
                                    <input
                                        placeholder='Oran' 
                                        type="number" 
                                        name='rate3'
                                        value={rate3}
                                        onChange={(e) => setRate3(e.target.value)}
                                        required
                                    />
                                    <span className="input-border"></span>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
            <button 
            className="button" 
            type="button" 
            onClick={hesapla} 
            disabled={loading}>
            {loading ? (
                <div className="spinner"></div>
            ) : ('Hesapla')}
            </button>
            {loading && <div className="loader"></div>}
            <div className="sonuc">
                <div id="sonuc">{result}</div>
            </div>
        </div>
    </>
  )
}

export default Body
