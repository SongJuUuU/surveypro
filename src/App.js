import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const programs = [
    "멘토링 프로그램", "재학생 취업 현황 조사", "취업 설명회 및 공고 게시", "RC 101 - 재학생 및 졸업생 간담회",
    "연세 의·치·간 Bio & Medical Idea Fair", "국제 교류 프로그램 대학 및 간호대학 동아리 활동", "간호대학 동아리 활동", "졸업생 홈커밍 데이 및 취업 현황 조사",
    "복수전공, 연계전공, 부전공 설명회", "진로관련 소규모 세미나"
  ];

  const [responses, setResponses] = useState({});
  const [currentProgram, setCurrentProgram] = useState(0);

  const [personalInfo, setPersonalInfo] = useState({
    gender: '',
    age: '',
    birthYear: '',
    grade: '',
    admissionType: '',
    gpa: '',
    majorReason: '',
    majorReasonEtc: '',
    economicStatus: ''
  });

  const [showDemographics, setShowDemographics] = useState(true);
  const [showFutureCompetency, setShowFutureCompetency] = useState(false);
  const [competencyScores, setCompetencyScores] = useState({
    therapeutic: 0,
    creative: 0,
    global: 0
  });

  const [ageError, setAgeError] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [showAdditionalQuestions, setShowAdditionalQuestions] = useState(false);
  const [additionalResponses, setAdditionalResponses] = useState({});
  const [showExpectationScale, setShowExpectationScale] = useState(false);
  const [expectationResponses, setExpectationResponses] = useState({});
  const [showFinalQuestions, setShowFinalQuestions] = useState(true);
  const [finalResponses, setFinalResponses] = useState({});
  const [showFinalPage, setShowFinalPage] = useState(false);
  const [contactInfo, setContactInfo] = useState('');
  const [wantInterview, setWantInterview] = useState(null);
  const [interviewEmail, setInterviewEmail] = useState('');

  const [currentPage, setCurrentPage] = useState('explanation');

  const [consents, setConsents] = useState({
    consent1: null,
    consent2: null,
    consent3: null,
    consent4: null,
    consent5: null,
    consent6: null
  });

  const [screening, setScreening] = useState({
    isEnrolled: null,
    isExcluded: null
  });

  const [additionalProgram, setAdditionalProgram] = useState({
    exists: null,
    name: '',
    participated: null,
    satisfaction: null,
    nonParticipationReason: '',
    otherReason: ''
  });

  const [selectedDates, setSelectedDates] = useState([]);

  // 새로운 상태 추가
  const [alternativeDate, setAlternativeDate] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const questions = {
    q1: [
      "1. 진로에 대한 고민이 있다.",
      "2. 진로를 결정하는데 어려움을 겪고 있다.",
      "3. 진로를 결정하는데 도움이 필요하다.",
      "4. 진로를 결정하는데 있어 주변의 지지가 필요하다.",
      "5. 진로를 결정하는데 있어 전문가의 도움이 필요하다.",
      "6. 진로를 결정하는데 있어 정보가 필요하다.",
      "7. 진로를 결정하는데 있어 시간이 필요하다.",
      "8. 진로를 결정하는데 있어 경험이 필요하다.",
      "9. 진로를 결정하는데 있어 자신감이 필요하다.",
      "10. 진로를 결정하는데 있어 용기가 필요하다.",
      "11. 진로를 결정하는데 있어 동기부여가 필요하다.",
      "12. 진로를 결정하는데 있어 목표설정이 필요하다."
    ],
    q2: [
      "13. 진로를 결정하는데 있어 가치관이 중요하다.",
      "14. 진로를 결정하는데 있어 적성이 중요하다.",
      "15. 진로를 결정하는데 있어 흥미가 중요하다.",
      "16. 진로를 결정하는데 있어 성격이 중요하다.",
      "17. 진로를 결정하는데 있어 능력이 중요하다.",
      "18. 진로를 결정하는데 있어 학업성적이 중요하다.",
      "19. 진로를 결정하는데 있어 전공이 중요하다.",
      "20. 진로를 결정하는데 있어 자격증이 중요하다.",
      "21. 진로를 결정하는데 있어 경력이 중요하다.",
      "22. 진로를 결정하는데 있어 인맥이 중요하다.",
      "23. 진로를 결정하는데 있어 취업시장이 중요하다.",
      "24. 진로를 결정하는데 있어 연봉이 중요하다.",
      "25. 진로를 결정하는데 있어 근무환경이 중요하다."
    ]
  };

  const finalQuestions = {
    q3: [
      "1. 나는 내가 선택한 직업에서 성공할 수 있다.",
      "2. 나는 내가 선택한 직업에서 만족할 수 있다.",
      "3. 나는 내가 선택한 직업에서 인정받을 수 있다.",
      "4. 나는 내가 선택한 직업에서 발전할 수 있다.",
      "5. 나는 내가 선택한 직업에서 행복할 수 있다.",
      "6. 나는 내가 선택한 직업에서 보람을 느낄 수 있다.",
      "7. 나는 내가 선택한 직업에서 성취감을 느낄 수 있다.",
      "8. 나는 내가 선택한 직업에서 자부심을 느낄 수 있다.",
      "9. 나는 내가 선택한 직업에서 능력을 발휘할 수 있다.",
      "10. 나는 내가 선택한 직업에서 전문성을 키울 수 있다."
    ],
    q4: [
      "11. 나는 내가 선택한 직업에서 안정적인 수입을 얻을 수 있다.",
      "12. 나는 내가 선택한 직업에서 높은 수입을 얻을 수 있다.",
      "13. 나는 내가 선택한 직업에서 여유있는 생활을 할 수 있다.",
      "14. 나는 내가 선택한 직업에서 사회적 지위를 얻을 수 있다.",
      "15. 나는 내가 선택한 직업에서 사회적 인정을 받을 수 있다.",
      "16. 나는 내가 선택한 직업에서 많은 사람들과 만날 수 있다.",
      "17. 나는 내가 선택한 직업에서 다양한 경험을 할 수 있다.",
      "18. 나는 내가 선택한 직업에서 나의 꿈을 실현할 수 있다.",
      "19. 나는 내가 선택한 직업에서 나의 가치관을 실현할 수 있다.",
      "20. 나는 내가 선택한 직업에서 나의 삶의 목표를 달성할 수 있다."
    ]
  };

  const handleKnowledgeResponse = useCallback((answer) => {
    setResponses(prev => ({
      ...prev,
      [programs[currentProgram]]: {
        ...prev[programs[currentProgram]],
        knows: answer
      }
    }));
  }, [currentProgram]);

  const handleParticipationResponse = useCallback((answer) => {
    setResponses(prev => ({
      ...prev,
      [programs[currentProgram]]: {
        ...prev[programs[currentProgram]],
        participated: answer
      }
    }));
  }, [currentProgram]);

  const handleSatisfactionResponse = useCallback((score) => {
    setResponses(prev => ({
      ...prev,
      [programs[currentProgram]]: {
        ...prev[programs[currentProgram]],
        satisfaction: score
      }
    }));
  }, [currentProgram]);

  const handleNonParticipationReason = useCallback((reason) => {
    setResponses(prev => ({
      ...prev,
      [programs[currentProgram]]: {
        ...prev[programs[currentProgram]],
        nonParticipationReason: reason,
        otherReason: reason === "기타" ? prev[programs[currentProgram]]?.otherReason || "" : ""
      }
    }));
  }, [currentProgram]);

  const handleOtherReasonChange = useCallback((text) => {
    setResponses(prev => ({
      ...prev,
      [programs[currentProgram]]: {
        ...prev[programs[currentProgram]],
        otherReason: text
      }
    }));
  }, [currentProgram]);

  const handleNextProgram = () => {
    if (currentProgram >= programs.length - 1) {
      setCurrentPage('additionalProgram');
    } else {
      setCurrentProgram(prev => prev + 1);
    }
  };

  const handlePreviousProgram = () => {
    setCurrentProgram(prev => prev - 1);
  };

  const showNextButton = () => {
    const response = responses[programs[currentProgram]];
    if (!response) return false;
    
    if (response.knows === "아니오") return true;
    if (response.participated === "네" && response.satisfaction) return true;
    if (response.participated === "아니오" && response.nonParticipationReason) return true;
    
    return false;
  };

  const showPreviousButton = () => {
    return currentProgram > 0;
  };

  const handlePersonalInfoChange = (field, value) => {
    if (field === 'age') {
      const age = parseInt(value);
      if (isNaN(age) || age < 15 || age >= 50 || !Number.isInteger(age)) {
        setAgeError('만 나이를 제대로 기입하였는지 확인해주세요.');
      } else {
        setAgeError('');
      }
    }
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
// 코드에디팅 바이 네오빔
  const handleCompetencyChange = (type, score) => {
    setCompetencyScores(prev => ({
      ...prev,
      [type]: score
    }));
  };

  const startSurvey = () => {
    const requiredFields = ['gender', 'age', 'grade', 'admissionType', 'gpa', 'majorReason', 'economicStatus'];
    const missingFields = requiredFields.filter(field => !personalInfo[field]);
    
    if (missingFields.length > 0) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    
    setCurrentPage('futureCompetency');
  };

  const startFutureCompetency = () => {
    setShowDemographics(false);
    setShowFutureCompetency(true);
  };

  const startMainSurvey = () => {
    if (Object.values(competencyScores).some(score => score === 0)) {
      alert('모든 항목을 평가해주세요.');
      return;
    }
    setShowFutureCompetency(false);
    setCurrentPage('programs');
  };

  const handleAdditionalResponse = (questionNumber, score) => {
    setAdditionalResponses(prev => ({
      ...prev,
      [questionNumber]: score
    }));
  };

  const handleExpectationResponse = (questionNumber, score) => {
    setExpectationResponses(prev => ({
      ...prev,
      [questionNumber]: score
    }));
  };

  const handleAdditionalSubmit = () => {
    if (Object.keys(additionalResponses).length < 25) {
      alert('모든 문항에 답변해주세요.');
      return;
    }
    setCurrentPage('expectationScale');
  };
//히히 지금 nvim으로 작성하고 있지롱
  const handleFinalResponse = (questionNumber, score) => {
    setFinalResponses(prev => ({
      ...prev,
      [questionNumber]: score
    }));
  };

  useEffect(() => {
    if (!showExpectationScale) {
      setShowFinalQuestions(true);
    }
  }, [showExpectationScale]);

  const handleExpectationSubmit = () => {
    if (Object.keys(expectationResponses).length < 4) {
      alert('모든 문항에 답변해주세요.');
      return;
    }
    setCurrentPage('finalQuestions');
  };

  const handleFinalSubmit = () => {
    if (Object.keys(finalResponses).length < 20) {
      alert('모든 문항에 답변해주세요.');
      return;
    }
    setCurrentPage('finalPage');
  };

  const handleExpectationPrevious = () => {
    setCurrentPage('programs');
  };

  const handleFinalQuestionsPrevious = () => {
    setCurrentPage('expectationScale');
  };

  const handleFinalPagePrevious = () => {
    setCurrentPage('finalQuestions');
  };

  const handleConsentChange = (consentId, value) => {
    setConsents(prev => ({
      ...prev,
      [consentId]: value
    }));
  };

  const checkAllConsents = () => {
    return Object.values(consents).every(consent => consent !== null) && 
           Object.values(consents).every(consent => consent === true);
  };

  const handleScreeningChange = (field, value) => {
    setScreening(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateSelection = (date) => {
    setSelectedDates(prev => {
      if (prev.includes(date)) {
        return prev.filter(d => d !== date);
      } else {
        return [...prev, date];
      }
    });
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'explanation':
        return (
          <div className="App">
            <div className="survey-container intro-container">
              <h2 style={{ textAlign: 'center' }}>대상자 설명문</h2>
              <div className="research-sections">
                <section>
                  <h3 style={{ display: 'inline-block', marginRight: '10px' }}>연구제목:</h3>
                  <p style={{ display: 'inline-block' }}>
                  '커리어 연세간호' 고도화 프로그램 개발을 위한 학생 진로 결정 요인 및 요구도 조사
                  </p>
                  
                  <p className="intro-description" style={{ textAlign: 'left' }}>
                    이 설명문은 이 연구에 대한 귀하의 이해를 돕기 위해 마련된 것이고, 이 연구에 대한 자세한 내용을 담고 있으니 
                    이 설명문을 읽고 충분히 이해하고 생각하신 후에 참여 여부를 결정해주시기 바랍니다. 
                    원하시는 경우 가족이나 그 외의 사람들과 의논하셔도 됩니다.
                  </p>

                  <p style={{ textAlign: 'left' }}>
                    귀하께서 자발적으로 동의하여 동의서를 작성하시는 경우에 연구에 참여하실 수 있으며 귀하께서는 이 연구에 참여하지 않기로 결정할 수도 있습니다. 
                    참여하지 않기로 결정하더라도 귀하께서 받게 될 치료에 아무런 영향을 주지 않을 것이며 그 외에 어떠한 불이익도 없을 것입니다.
                  </p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>1. 임상 연구 배경 및 목적</h3>
                  <p style={{ textAlign: 'left' }}>4차 산업시대와 다변화된 의료시장의 확대로 전반적인 의료의 질 향상 및 다층적 보건의료 대응의 필요성을 증대시키고, 전문 의료서비스와 돌봄 서비스 수요를 증가시킴에 따라, 간호사에 대한 사회적 기대 또한 높아지고 있습니다. 특히 다양한 건강요구에 대응할 수 있는 역량을 갖추고 디지털 기술을 활용한 학습 과정을 통해 지식과 기술을 습득할 수 있는 간호 인재 양성이 필수적입니다. 간호대학생이 미래 사회 역량 있는 구성원이자 리더로서 성장할 기회를 제공하기 위해 고도화된 진로지도 프로그램이 필요합니다. 이에 본 연구는 연세대학교 간호대학의 진로지도 프로그램에 대한 참여 경험 및 요구도를 탐색하여 효과적인 진로지도 개선 방안을 마련하고자 합니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>2. 임상연구에 참여하는 대상자 수 및 참여 기간</h3>
                  <p style={{ textAlign: 'left' }}>이 연구는 연세대학교 간호대학에서 주관하고, 연구진행도 연세대학교 간호대학생을 대상으로 이루어집니다. 총 255명이 참여할 예정이고, 연구 기간은 세브란스병원 연구심의의원회 승인 후부터 2025년 10월 31일까지입니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>3. 임상연구의 절차 및 방법</h3>
                  <p style={{ textAlign: 'left' }}>귀하께서 본 연구에 참여하시기로 결정하셨다면, 대상자 동의서 양식에 서명하시게 됩니다. 동의서에 서명하신 이후에, 연구자는 귀하의 일반적 특성, 진로결정 자기효능감, 결과기대척도, 진로준비행동, 본인이 참여한 진도지도 프로그램의 인지 여부, 참여 여부, 만족도 등에 대한 설문을 하게 됩니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>4. 임상연구에 참여하여 기대할 수 있는 이익</h3>
                  <p style={{ textAlign: 'left' }}>귀하의 본 연구 참여는 학점과 관련된 직접적인 이익은 없으나 궁극적으로 귀하의 참여는 효과적인 진로지도 프로그램을 개발하는데 큰 도움이 되며, 연세대학교 간호대학의 학생들이 미래 간호인력과 리더로서 성장하기 위한 시스템 구축에 기여할 것입니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>5. 임상연구에 참여하여 예상되는 위험 및 불편</h3>
                  <p style={{ textAlign: 'left' }}>설문지 작성을 위한 약 20 분 정도의 시간적 부담이 있을 수 있으나, 그 외의 연구와 관련된 큰 불편감 및 예상되는 위험성은 없습니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>6. 임상연구 참여에 따른 비용</h3>
                  <p style={{ textAlign: 'left' }}>본 연구는 조사연구로 연구참여로 인한 비용이 발생하지 않습니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>7. 임상연구 참여에 따른 사례비</h3>
                  <p style={{ textAlign: 'left' }}>귀하가 설문조사에 참여하여 협조해주신 것에 대한 감사의 마음으로 5,000원 상당의 모바일 쿠폰을 드립니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>8. 연구와 관련한 손상이 발생한 경우, 대상자에게 주어질 보상이나 치료방법</h3>
                  <p style={{ textAlign: 'left' }}>설문조사에 참여하는 동안 시간적 부담이 있을 수 있으나, 침습적인 검사가 포함되지 않으므로 신체적 불편이나 연구와 관련된 심각한 위험은 예상되지 않습니다. 다만, 설문지 작성 중 심리적 피로감이 발생할 경우, 어떠한 불이익 없이 언제든지 연구 참여를 중단하실 수 있습니다. 본 연구 참여로 인해 발생할 수 있는 손실(시간 소모, 심리적 피로감 등)에 대한 별도의 금전적 보상이나 치료 지원은 제공되지 않습니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>9. 새로운 정보 제공 여부</h3>
                  <p style={{ textAlign: 'left' }}>본 연구는 20분 정도가 소요되는 1회의 설문조사로 귀하에게 영향을 줄 수 있는 새로운 정보는 없을 것입니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>10. 대상자가 준수하여야 하는 사항</h3>
                  <p style={{ textAlign: 'left' }}>본 연구는 20분 정도가 소요되는 1회의 설문조사로 모든 문항에 응답이 필요합니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>11. 임상연구 참여에서의 중도 탈락</h3>
                  <p style={{ textAlign: 'left' }}>본 연구는 20분 정도가 소요되는 1회의 설문조사로 귀하가 원할 시 언제라도 연구 참여를 그만 둘 수 있습니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>12. 정보 수집 및 제공</h3>
                  <p style={{ textAlign: 'left' }}>본 동의서에 서명함으로써 귀하는 연구진이 귀하의 개인(민감)정보를 수집하고 사용하는데 동의하게 됩니다.</p>
                  <p className="highlight" style={{ textAlign: 'left' }}>※ 자세한 사항은 아래 내용을 참조하여 주십시오.</p>
                  
                  <div className="info-details">
                    <h4 style={{ textAlign: 'left' }}>개인(민감)정보의 수집∙이용 목적</h4>
                    <p style={{ textAlign: 'left' }}>전화번호는 모바일 쿠폰 발송을 위해서만 수집되며 연구 종료 시, 즉시 파기됩니다. 그 외 개인정보는 연구 결과 분석을 위해서만 사용됩니다.</p>
                    
                    <h4 style={{ textAlign: 'left' }}>수집하려는 개인(민감)정보 항목</h4>
                    <p style={{ textAlign: 'left' }}>개인정보: 전화번호, 성별, 학년, 학업 성적, 가족경제수준</p>
                    <p style={{ textAlign: 'left' }}>민감정보: 해당 없음.</p>
                  </div>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>13. 개인정보 및 기록에 대한 비밀보장</h3>
                  <p style={{ textAlign: 'left' }}>귀하가 이 연구에 참여하는 동안에 수집되는 귀하의 기록은 비밀로 보장될 것이며, 연구의 결과가 보고서로 작성되거나 출판, 또는 발표되는 경우에도 귀하의 신원을 파악할 수 있는 기록은 비밀 상태로 유지될 것입니다.
                    <br />
                    <br />

                    귀하 또는 귀하의 대리인이 본 동의서에 서명함으로써, 귀하는 이 연구를 모니터/점검하는 자, 연구심의위원회, 관계 부처 (예: 보건복지부) 등이 귀하의 비밀 보장을 침해하지 않고 관련 규정이 정하는 범위 안에서 연구의 실시 절차와 자료의 신뢰성을 검증하기 위해 귀하의 의무기록을 열람하는 것에 대하여 동의하게 됩니다.
                    <br />
                    <br />

                    연구 목적으로 수집된 개인정보는 나이, 성별, 학년, 학업 성적, 가족경제 수준입니다. 이 정보는 연구를 위해 3 년간 사용되며 수집된 정보는 개인정보보호법에 따라 적절히 관리됩니다. 관련정보는 열쇠로만 접근이 가능한 연구실 내 컴퓨터에 보관합니다. 수집된 1 차 자료는 즉시 코딩하여 파일로 보관 가능한 2 차 자료로 변환되어 연구 책임자의 컴퓨터에 보관될 것입니다. 이 컴퓨터는 연구책임자만 식별할 수 있는 암호를 입력하여 접근이 가능하며 각 데이터 파일도 비밀번호를 입력하여 접근할 수 있도록 하여 개인정보가 노출되지 않도록 관리할 것이며, 연구와 관련된 기록은 연구종료 후 3 년간 보관 후 컴퓨터의 포멧을 통해 폐기될 것입니다.
                  </p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>14. 참여/철회의 자발성</h3>
                  <p style={{ textAlign: 'left' }}>귀하는 언제든지 연구 참여에 대한 동의를 철회할 수 있으며, 철회 시 연구 참여는 종료되고 연구진은 추가적인 정보를 수집하지 않습니다. 다만, 철회 이전에 수집된 정보는 연구 분석 및 결과 보고를 위해 익명 처리된 상태로 계속 활용될 수 있습니다.
                    <br />
                    만약 수집된 정보를 폐기하고 연구에 이용되지 않기를 원하신다면, 연구자에게 연락하여 의사를 전달해 주시기 바랍니다.
                    <br />
                    또한, 귀하는 본 연구에 참여하지 않을 자유가 있으며, 참여하지 않거나 중도 철회하더라도 어떠한 불이익도 발생하지 않습니다.
                  </p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>15. 연락처</h3>
                  <p style={{ textAlign: 'left' }}>이 연구에 관하여 궁금한 점이 있거나 연구와 관련이 있는 상해가 발생한 경우에는 아래의 연구자에게 연락하여 주십시오.</p>
                  <div className="contact-info" style={{ textAlign: 'left' }}>
                    <p>연구담당자:</p>
                    <p>신유미 (YUSHIN23@yuhs.ac, 02-2228-3358)</p>
                    <p>연구 책임자:</p>
                    <p>김희정 (HKIM80@yuhs.ac, 02-2228-3273)</p>
                  </div>
                  
                  <div className="additional-contacts" style={{ textAlign: 'left' }}>
                    <p>대상자로서 귀하의 권리에 대하여 질문이 있는 경우에는 연구자에게 말씀하시거나 다음의 번호로 문의하실 수 있습니다.</p>
                    <p>세브란스병원 연구심의위원회 ☎ 02-2228-0430~4</p>
                    <p>세브란스병원 임상연구보호센터 ☎ 02-2228-0450~4</p>
                  </div>
                </section>
              </div>

              <button 
                className="start-survey-button"
                onClick={() => setCurrentPage('consent')}
              >
                다음
              </button>
            </div>
          </div>
        );
      case 'consent':
        return (
          <div className="App">
            <div className="survey-container intro-container">
              <div className="consent-form">
                <h2>온라인 대상자 동의서</h2>
                <h3>
                  연구제목: '커리어 연세간호' 고도화 프로그램 개발을 위한 학생 진로 결정 요인 및 요구도 조사
                </h3>
                
                <p className="consent-notice">
                  ※ 본인은 충분한 시간을 갖고 생각한 결과, 다음을 이해하고 자발적으로 참여하는 것에 동의합니다.<br/>
                  ※ 아래 항목을 읽고 동의한다면, 체크박스를 선택해 주시기 바랍니다.
                </p>

                <div className="consent-items">
                  <div className="consent-item">
                    <p>본인은 이 설명문을 읽었으며, 본 임상연구의 목적, 방법, 기대효과, 가능한 위험성 등에 대한 충분한 설명을 듣고 이해하였습니다.</p>
                    <div className="consent-radio-group">
                      <label>
                        <input
                          type="radio"
                          name="consent1"
                          checked={consents.consent1 === true}
                          onChange={() => handleConsentChange('consent1', true)}
                        />
                        동의합니다
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="consent1"
                          checked={consents.consent1 === false}
                          onChange={() => handleConsentChange('consent1', false)}
                        />
                        동의하지 않습니다
                      </label>
                    </div>
                  </div>
                  <div className="consent-item">
                    <p>연구목적으로 개인(민감)정보 수집∙이용∙제공 등에 관한 설명을 이해하였습니다.</p>
                    <div className="consent-radio-group">
                      <label>
                        <input
                          type="radio"
                          name="consent2"
                          checked={consents.consent2 === true}
                          onChange={() => handleConsentChange('consent2', true)}
                        />
                        동의합니다
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="consent2"
                          checked={consents.consent2 === false}
                          onChange={() => handleConsentChange('consent2', false)}
                        />
                        동의하지 않습니다
                      </label>
                    </div>
                  </div>
                  <div className="consent-item">
                    <p>본인의 개인정보 수집 및 사용에 동의합니다.</p>
                    <div className="consent-radio-group">
                      <label>
                        <input
                          type="radio"
                          name="consent3"
                          checked={consents.consent3 === true}
                          onChange={() => handleConsentChange('consent3', true)}
                        />
                        동의합니다
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="consent3"
                          checked={consents.consent3 === false}
                          onChange={() => handleConsentChange('consent3', false)}
                        />
                        동의하지 않습니다
                      </label>
                    </div>
                  </div>
                  <div className="consent-item">
                    <p>본인의 민감정보 수집 및 사용에 동의합니다.</p>
                    <div className="consent-radio-group">
                      <label>
                        <input
                          type="radio"
                          name="consent4"
                          checked={consents.consent4 === true}
                          onChange={() => handleConsentChange('consent4', true)}
                        />
                        동의합니다
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="consent4"
                          checked={consents.consent4 === false}
                          onChange={() => handleConsentChange('consent4', false)}
                        />
                        동의하지 않습니다
                      </label>
                    </div>
                  </div>
                  <div className="consent-item">
                    <p>수집된 자료는 추가 연구를 위한 2차 분석에 활용하는 것에 대해 이해하였습니다.</p>
                    <div className="consent-radio-group">
                      <label>
                        <input
                          type="radio"
                          name="consent5"
                          checked={consents.consent5 === true}
                          onChange={() => handleConsentChange('consent5', true)}
                        />
                        동의합니다
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="consent5"
                          checked={consents.consent5 === false}
                          onChange={() => handleConsentChange('consent5', false)}
                        />
                        동의하지 않습니다
                      </label>
                    </div>
                  </div>
                  <div className="consent-item">
                    <p>이 연구에 동의한 경우라도 언제든지 철회할 수 있고, 철회 이후 다른 적절한 교육을 받을 수 있음을 확인하였습니다.</p>
                    <div className="consent-radio-group">
                      <label>
                        <input
                          type="radio"
                          name="consent6"
                          checked={consents.consent6 === true}
                          onChange={() => handleConsentChange('consent6', true)}
                        />
                        동의합니다
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="consent6"
                          checked={consents.consent6 === false}
                          onChange={() => handleConsentChange('consent6', false)}
                        />
                        동의하지 않습니다
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="navigation-buttons">
                <button 
                  className="nav-button previous-button"
                  onClick={() => setCurrentPage('explanation')}
                >
                  이전
                </button>
                <button 
                  className="start-survey-button"
                  onClick={() => {
                    if (Object.values(consents).some(consent => consent === null)) {
                      alert('모든 항목에 대해 동의 여부를 선택해주세요.');
                      return;
                    }
                    if (Object.values(consents).some(consent => consent === false)) {
                      alert('모든 항목에 동의해야 설문에 참여하실 수 있습니다.\n동의하지 않으신 항목이 있는 경우 설문에 참여하실 수 없습니다.');
                      return;
                    }
                    setCurrentPage('screening');
                  }}
                >
                  동의하고 설문 시작하기
                </button>
              </div>
            </div>
          </div>
        );
      case 'screening':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="navigation-buttons">
                <button 
                  className="nav-button previous-button"
                  onClick={() => setCurrentPage('consent')}
                >
                  이전
                </button>
                <h2>자격 확인</h2>
              </div>

              <div className="screening-questions">
                <div className="screening-item">
                  <h3>1. 2024-2학기에 연세대학교 간호대학 학위과정 1-4학년에 재학하였습니까?</h3>
                  <div className="screening-buttons">
                    <button
                      className={`demo-button ${screening.isEnrolled === true ? 'selected' : ''}`}
                      onClick={() => handleScreeningChange('isEnrolled', true)}
                    >예</button>
                    <button
                      className={`demo-button ${screening.isEnrolled === false ? 'selected' : ''}`}
                      onClick={() => handleScreeningChange('isEnrolled', false)}
                    >아니오</button>
                  </div>
                </div>

                <div className="screening-item">
                  <h3>2. 2024-2학기 기준 다음에 해당되십니까?</h3>
                  <p className="screening-subtext">휴학생 / 제적생 / 전과 예정자</p>
                  <div className="screening-buttons">
                    <button
                      className={`demo-button ${screening.isExcluded === true ? 'selected' : ''}`}
                      onClick={() => handleScreeningChange('isExcluded', true)}
                    >예</button>
                    <button
                      className={`demo-button ${screening.isExcluded === false ? 'selected' : ''}`}
                      onClick={() => handleScreeningChange('isExcluded', false)}
                    >아니오</button>
                  </div>
                </div>

                <button 
                  className="start-survey-button"
                  onClick={() => {
                    if (screening.isEnrolled === null || screening.isExcluded === null) {
                      alert('모든 항목에 답변해주세요.');
                      return;
                    }
                    
                    if (screening.isEnrolled === true && screening.isExcluded === false) {
                      setCurrentPage('demographics');
                    } else {
                      alert('죄송합니다. 귀하께서는 연구 대상자 선정기준에 맞지 않습니다.\n설문 참여가 제한됩니다.');
                    }
                  }}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        );
      case 'demographics':
        return (
          <div className="App">
            <div className="survey-container">
              <h2>기본 정보</h2>
              
              <div className="demographics-section">
                <div className="question">
                  <h3>1. 성별</h3>
                  <button 
                    className={`demo-button ${personalInfo.gender === '남성' ? 'selected' : ''}`}
                    onClick={() => handlePersonalInfoChange('gender', '남성')}
                  >남성</button>
                  <button 
                    className={`demo-button ${personalInfo.gender === '여성' ? 'selected' : ''}`}
                    onClick={() => handlePersonalInfoChange('gender', '여성')}
                  >여성</button>
                </div>

                <div className="question">
                  <h3>2.만 나이</h3>
                  <div className="age-input">
                    <input
                      type="number"
                      placeholder="만 나이"
                      value={personalInfo.age}
                      onChange={(e) => handlePersonalInfoChange('age', e.target.value)}
                      min="15"
                      max="49"
                    />
                    <span>세</span>
                  </div>
                  {ageError && <div className="error-message">{ageError}</div>}
                </div>

                <div className="question">
                  <h3>3. 학년</h3>
                  {['1학년', '2학년', '3학년', '4학년'].map(grade => (
                    <button
                      key={grade}
                      className={`demo-button ${personalInfo.grade === grade ? 'selected' : ''}`}
                      onClick={() => handlePersonalInfoChange('grade', grade)}
                    >{grade}</button>
                  ))}
                </div>

                <div className="question">
                  <h3>4. 입학 과정</h3>
                  {['정시 입학', '수시 입학', '학사 편입'].map(type => (
                    <button
                      key={type}
                      className={`demo-button ${personalInfo.admissionType === type ? 'selected' : ''}`}
                      onClick={() => handlePersonalInfoChange('admissionType', type)}
                    >{type}</button>
                  ))}
                </div>

                <div className="question">
                  <h3>5. 본인의 누적 학업 성취도를 선택해주세요.</h3>
                  {[
                    '2.0 미만',
                    '2.0 이상 - 3.0 미만',
                    '3.0 이상 - 4.0 미만',
                    '4.0 이상'
                  ].map(gpa => (
                    <button
                      key={gpa}
                      className={`demo-button ${personalInfo.gpa === gpa ? 'selected' : ''}`}
                      onClick={() => handlePersonalInfoChange('gpa', gpa)}
                    >{gpa}</button>
                  ))}
                </div>

                <div className="question">
                  <h3>6. 전공을 선택한 이유는 무엇입니까?</h3>
                  {['개인적 흥미', '성적에 맞추어서', '취업의 용이성'].map(reason => (
                    <button
                      key={reason}
                      className={`demo-button ${personalInfo.majorReason === reason ? 'selected' : ''}`}
                      onClick={() => handlePersonalInfoChange('majorReason', reason)}
                    >{reason}</button>
                  ))}
                  <button
                    className={`demo-button ${personalInfo.majorReason === '기타' ? 'selected' : ''}`}
                    onClick={() => handlePersonalInfoChange('majorReason', '기타')}
                  >기타</button>
                  {personalInfo.majorReason === '기타' && (
                    <input
                      type="text"
                      placeholder="기타 사유를 입력해주세요"
                      value={personalInfo.majorReasonEtc}
                      onChange={(e) => handlePersonalInfoChange('majorReasonEtc', e.target.value)}
                      className="etc-input"
                    />
                  )}
                </div>

                <div className="question">
                  <h3>7. 본인이 인지하는 가족의 경제 수준을 선택해주세요.</h3>
                  {['상', '중', '하'].map(status => (
                    <button
                      key={status}
                      className={`demo-button ${personalInfo.economicStatus === status ? 'selected' : ''}`}
                      onClick={() => handlePersonalInfoChange('economicStatus', status)}
                    >{status}</button>
                  ))}
                </div>

                <button 
                  className="start-survey-button"
                  onClick={startSurvey}
                >
                  설문 시작하기
                </button>
              </div>
            </div>
          </div>
        );
      case 'futureCompetency':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="navigation-buttons">
                <button 
                  className="nav-button previous-button"
                  onClick={() => setShowFutureCompetency(false) || setShowDemographics(true)}
                >
                  이전
                </button>
                <h2>미래 인재상과 준비도</h2>
              </div>
              <div className="competency-intro">
                <p>연세대학교 간호대학은 미래의 건강사회를 이끌어갈 새로운 역량 개발을 위해 추구하는 인재상이 아래와 같이 있습니다.</p>
                <ol>
                  <li>치료적 돌봄을 제공하는 간호사</li>
                  <li>창의융합적 건강전문가</li>
                  <li>변화를 이끄는 글로벌 리더</li>
                </ol>
                <p>각 인재상에 비추어 보았을 때, 본인은 각각의 항목에서 얼마나 준비되었다고 생각하나요?</p>
              </div>

              <div className="competency-section">
                <div className="competency-question">
                  <h3>1. 치료적 돌봄을 제공하는 간호사</h3>
                  <div className="score-labels">
                    <span>매우 부족함</span>
                    <span>보통임</span>
                    <span>매우 충분함</span>
                  </div>
                  <div className="score-buttons">
                    {[1, 2, 3, 4, 5].map(score => (
                      <button
                        key={score}
                        className={`score-button ${competencyScores.therapeutic === score ? 'selected' : ''}`}
                        onClick={() => handleCompetencyChange('therapeutic', score)}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="competency-question">
                  <h3>2. 창의융합적 건강전문가</h3>
                  <div className="score-labels">
                    <span>매우 부족함</span>
                    <span>보통임</span>
                    <span>매우 충분함</span>
                  </div>
                  <div className="score-buttons">
                    {[1, 2, 3, 4, 5].map(score => (
                      <button
                        key={score}
                        className={`score-button ${competencyScores.creative === score ? 'selected' : ''}`}
                        onClick={() => handleCompetencyChange('creative', score)}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="competency-question">
                  <h3>3. 변화를 이끄는 글로벌 리더</h3>
                  <div className="score-labels">
                    <span>매우 부족함</span>
                    <span>보통임</span>
                    <span>매우 충분함</span>
                  </div>
                  <div className="score-buttons">
                    {[1, 2, 3, 4, 5].map(score => (
                      <button
                        key={score}
                        className={`score-button ${competencyScores.global === score ? 'selected' : ''}`}
                        onClick={() => handleCompetencyChange('global', score)}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  className="start-survey-button"
                  onClick={startMainSurvey}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        );
      case 'programs':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="navigation-buttons">
                <button 
                  className="nav-button previous-button"
                  onClick={() => setCurrentPage('futureCompetency')}
                >
                  이전
                </button>
                <h2>진로지도 프로그램 설문</h2>
              </div>

              <div className="program-questions">
                <div className="program-intro">
                  <p>
                    이제부터는 연세대학교 간호대학에서 실시하는 '커리어 연세 간호'와 관련한 [진로지도 프로그램]에 대한 질문들입니다. 
                    각 프로그램에 대하여, 인지 여부, 참여 여부, 만족도 그리고 불참 이유에 대한 질문을 드릴 예정입니다. 
                    각 프로그램에 대한 질문에 성실히 응답해주시길 바랍니다.
                  </p>
                </div>

                <div className="current-program">
                  <h3>{programs[currentProgram]}</h3>
                  <div className="question" style={{ textAlign: 'center' }}>
                    <h3 style={{ textAlign: 'center' }}>{programs[currentProgram]}에 대해서 <br /> 알고계십니까?</h3>
                    <button 
                      className={responses[programs[currentProgram]]?.knows === "네" ? 'selected' : ''}
                      onClick={() => handleKnowledgeResponse("네")}
                    >네</button>
                    <button 
                      className={responses[programs[currentProgram]]?.knows === "아니오" ? 'selected' : ''}
                      onClick={() => handleKnowledgeResponse("아니오")}
                    >아니오</button>
                  </div>

                  {responses[programs[currentProgram]]?.knows === "네" && (
                    <div className="question" style={{ textAlign: 'center' }}>
                      <h3 style={{ textAlign: 'center' }}>{programs[currentProgram]}에 <br />참여해보신적이 있으십니까?</h3>
                      <button 
                        className={responses[programs[currentProgram]]?.participated === "네" ? 'selected' : ''}
                        onClick={() => handleParticipationResponse("네")}
                      >네</button>
                      <button 
                        className={responses[programs[currentProgram]]?.participated === "아니오" ? 'selected' : ''}
                        onClick={() => handleParticipationResponse("아니오")}
                      >아니오</button>
                    </div>
                  )}

                  {responses[programs[currentProgram]]?.knows === "네" && 
                    responses[programs[currentProgram]]?.participated === "네" && (
                    <div className="question" style={{ textAlign: 'center' }}>
                      <h3 style={{ textAlign: 'center' }}>{programs[currentProgram]}에 대한 <br />만족도를 선택해주세요.</h3>
                      <div className="score-labels">
                        <span>매우 불만족</span>
                        <span>보통</span>
                        <span>매우 만족</span>
                      </div>
                      <div className="score-buttons">
                        {[1, 2, 3, 4, 5].map(score => (
                          <button
                            key={score}
                            className={`score-button ${responses[programs[currentProgram]]?.satisfaction === score ? 'selected' : ''}`}
                            onClick={() => handleSatisfactionResponse(score)}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {responses[programs[currentProgram]]?.knows === "네" && 
                    responses[programs[currentProgram]]?.participated === "아니오" && (
                    <div className="question" style={{ textAlign: 'center' }}>
                      <h3 style={{ textAlign: 'center' }}>왜 참여하지 않으셨나요?</h3>
                      <button 
                        className={responses[programs[currentProgram]]?.nonParticipationReason === "시간이 없어서" ? 'selected' : ''}
                        onClick={() => handleNonParticipationReason("시간이 없어서")}
                      >
                        시간이 없어서
                      </button>
                      <button 
                        className={responses[programs[currentProgram]]?.nonParticipationReason === "관심이 없어서" ? 'selected' : ''}
                        onClick={() => handleNonParticipationReason("관심이 없어서")}
                      >
                        관심이 없어서
                      </button>
                      <button 
                        className={responses[programs[currentProgram]]?.nonParticipationReason === "도움이 안될 것 같아서" ? 'selected' : ''}
                        onClick={() => handleNonParticipationReason("도움이 안될 것 같아서")}
                      >
                        도움이 안될 것 같아서
                      </button>
                      <button 
                        className={responses[programs[currentProgram]]?.nonParticipationReason === "기타" ? 'selected' : ''}
                        onClick={() => handleNonParticipationReason("기타")}
                      >
                        기타
                      </button>
                      {responses[programs[currentProgram]]?.nonParticipationReason === "기타" && (
                        <input
                          type="text"
                          className="other-reason-input"
                          placeholder="기타 사유를 입력해주세요"
                          value={responses[programs[currentProgram]]?.otherReason || ""}
                          onChange={(e) => handleOtherReasonChange(e.target.value)}
                        />
                      )}
                    </div>
                  )}
                </div>

                {showNextButton() && (
                  <div className="next-button-container">
                    <button 
                      className="nav-button next-button"
                      onClick={handleNextProgram}
                    >
                      다음
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'expectationScale':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="navigation-buttons">
                <button 
                  className="nav-button previous-button"
                  onClick={handleExpectationPrevious}
                >
                  이전
                </button>
                <h2>결과기대척도</h2>
              </div>

              <div className="expectation-intro">
                <p>
                  사람들은 희망직업을 선택할 때 그 직업이 지닌 매우 다양한 장점들을 고려합니다. 
                  사람마다 차이가 있지만 어떤 사람들은 자신의 능력이나 창의성을 발휘할 수 있고 전문성을 습득할 수 있는 직업을 좋아하고, 
                  어떤 사람들은 보수가 많고 사회적으로 인정받는 직업을 좋아하고 또 어떤 사람은 안정적이면서 리더가 빨리 될 수 있는 직업을 좋아합니다. 
                  당신이 가장 원하는 직업을 생각하면서 자신에게 해당되는 번호에 체크 하시기 바랍니다.
                </p>
              </div>

              <div className="expectation-questions">
                {[
                  "선택한 직업이 다른 직업들에 비해 장점을 얼마나 많이 가지고 있다고 생각하십니까?",
                  "선택한 직업의 장점이 다른 직업들이 지닌 장점에 비해 얼마나 좋다고 생각하십니까?",
                  "선택한 직업이 당신에게 당신이 원하는 장점을 어느 정도나 충족시켜 주리라고 생각하십니까?",
                  "선택한 직업이 당신에게 가장 원하는 것을 가지게 해줄 가능성은 어느 정도라고 생각하십니까?"
                ].map((question, index) => (
                  <div key={index} className="competency-question">
                    <h3>{index + 1}. {question}</h3>
                    <div className="score-labels">
                    
                    </div>
                    <div className="score-buttons">
                      {[1, 2, 3, 4, 5].map(score => (
                        <button
                          key={score}
                          className={`score-button ${expectationResponses[index + 1] === score ? 'selected' : ''}`}
                          onClick={() => handleExpectationResponse(index + 1, score)}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                    <div className="score-descriptions">
                      <span>매우 적음</span>
                      <span>대체로 적은 편</span>
                      <span>보통 정도</span>
                      <span>대체로 많은 편</span>
                      <span>매우 많음</span>
                    </div>
                  </div>
                ))}

                <button 
                  className="start-survey-button"
                  onClick={handleExpectationSubmit}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        );
      case 'finalQuestions':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="navigation-buttons">
                <button 
                className="nav-button previous-button"
                onClick={handleFinalQuestionsPrevious}
              >
                이전
              </button>
              <h2>진로준비행동</h2>
              </div>

              <div className="career-behavior-intro">
                <p>
                  진로준비행동은 개인이 올바른 진로결정을 위해서 얼마나 노력을 하고 있는지, 그리고 결정된
                  진로결정을 위해서 얼마나 노력을 하고 있는지, 그리고 결정된 진로목표를 달성하기 위해서
                  구체적으로 얼마나 충실하게 행위적인 노력을 하고 있는지에 관한 것입니다. 아래 문항을 잘 읽으시고,
                  자신에게 해당되는 번호에 체크 하시기 바랍니다.
                </p>
              </div>

              <div className="final-questions">
                {[...finalQuestions.q3, ...finalQuestions.q4].map((question, index) => (
                  <div key={index} className="competency-question">
                    <h3>{question}</h3>
                    <div className="score-labels">
                      <span>전혀 그렇지 않다</span>
                      <span>보통이다</span>
                      <span>매우 그렇다</span>
                    </div>
                    <div className="score-buttons">
                      {[1, 2, 3, 4, 5].map(score => (
                        <button
                          key={score}
                          className={`score-button ${finalResponses[index + 1] === score ? 'selected' : ''}`}
                          onClick={() => handleFinalResponse(index + 1, score)}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button 
                  className="start-survey-button"
                  onClick={handleFinalSubmit}
                >
                  제출하기
                </button>
              </div>
            </div>
          </div>
        );
      case 'finalPage':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="navigation-buttons">
                <button 
                  className="nav-button previous-button"
                  onClick={() => setCurrentPage('careerBehavior')}
                >
                  이전
                </button>
                <h2>추가 인터뷰 참여</h2>
              </div>

              <div className="interview-section">
                <h3 style={{ textAlign: 'center' }}>[연세대학교 간호대학 진로지도 경험 연구를 위한 집단 인터뷰 참여자 모집]</h3>
                <p>
                  향후 연세대학교 간호대학생들의 진로 지도와 관련된 심층적인 경험을 탐구하기 위해 
                  집단 인터뷰를 시행할 예정입니다. 집단 인터뷰에 참여하셔서 귀하의 소중한 경험과 
                  의견을 나누어 주시면 연구에 큰 도움이 될 것입니다.
                </p>
                <p>
                  집단 인터뷰에 참여를 원하십니까? 
                  <br />
                  (추가 사례금을 지급해드리며, 인터뷰에 대한 
                  
                  설명을 들으신 후에 참여 의향을 철회하셔도 됩니다.)
                </p>
                <div className="interview-buttons">
                  <button
                    className={`demo-button ${wantInterview === true ? 'selected' : ''}`}
                    onClick={() => {
                      setWantInterview(true);
                      setCurrentPage('additionalSurvey');
                    }}
                  >네</button>
                  <button
                    className={`demo-button ${wantInterview === false ? 'selected' : ''}`}
                    onClick={() => {
                      setWantInterview(false);
                      setCurrentPage('surveyComplete');
                    }}
                  >아니요</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'additionalQuestions':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="navigation-buttons">
                <button 
                  className="nav-button previous-button"
                  onClick={() => setCurrentPage('programs')}
                >
                  이전
                </button>
                <h2>진로결정 자기효능감</h2>
              </div>

              <div className="career-efficacy-intro">
                <p>
                  아래에 제시된 문항들은 현재 여러분이 자신의 진로를 결정하기 위해서 다음과 같은 일들을 수행할 때 
                  얼마나 자신감을 느끼는지 그 정도에 따라 번호에 체크 하여 주시기 바랍니다.
                </p>
              </div>

              <div className="additional-questions">
                {[...questions.q1, ...questions.q2].map((question, index) => (
                  <div key={index} className="competency-question">
                    <h3>{question}</h3>
                    <div className="score-labels">
                      <span>전혀 그렇지 않다</span>
                      <span>보통이다</span>
                      <span>매우 그렇다</span>
                    </div>
                    <div className="score-buttons">
                      {[1, 2, 3, 4, 5].map(score => (
                        <button
                          key={score}
                          className={`score-button ${additionalResponses[index + 1] === score ? 'selected' : ''}`}
                          onClick={() => handleAdditionalResponse(index + 1, score)}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button 
                  className="start-survey-button"
                  onClick={handleAdditionalSubmit}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        );
      case 'additionalProgram':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="navigation-buttons">
                <button 
                  className="nav-button previous-button"
                  onClick={() => setCurrentPage('programs')}
                >
                  이전
                </button>
                <h2>추가 프로그램</h2>
              </div>

              <div className="additional-program-section">
                <div className="question">
                  <h3>앞서 언급된 프로그램 외에 알고 있는 진로지도 프로그램이 있으십니까?</h3>
                  <div className="program-buttons">
                    <button 
                      className={`demo-button ${additionalProgram.exists === true ? 'selected' : ''}`}
                      onClick={() => setAdditionalProgram(prev => ({...prev, exists: true}))}
                    >
                      예
                    </button>
                    <button 
                      className={`demo-button ${additionalProgram.exists === false ? 'selected' : ''}`}
                      onClick={() => setAdditionalProgram(prev => ({...prev, exists: false}))}
                    >
                      아니오
                    </button>
                  </div>
                </div>

                {additionalProgram.exists === true && (
                  <>
                    <div className="question">
                      <h3>프로그램의 이름을 적어주세요:</h3>
                      <input
                        type="text"
                        className="program-name-input"
                        value={additionalProgram.name}
                        onChange={(e) => setAdditionalProgram(prev => ({...prev, name: e.target.value}))}
                        placeholder="프로그램 이름을 입력해주세요"
                      />
                    </div>

                    <div className="question">
                      <h3>해당 프로그램에 참여해보신적이 있으십니까?</h3>
                      <button 
                        onClick={() => setAdditionalProgram(prev => ({...prev, participated: true}))}
                        className={additionalProgram.participated === true ? 'selected' : ''}
                      >
                        네
                      </button>
                      <button 
                        onClick={() => setAdditionalProgram(prev => ({...prev, participated: false}))}
                        className={additionalProgram.participated === false ? 'selected' : ''}
                      >
                        아니오
                      </button>
                    </div>

                    {additionalProgram.participated === true && (
                      <div className="question">
                        <h3>프로그램에 대한 만족도를 선택해주세요.</h3>
                        <div className="score-labels">
                          <span>매우 불만족</span>
                          <span>보통</span>
                          <span>매우 만족</span>
                        </div>
                        <div className="score-buttons">
                          {[1, 2, 3, 4, 5].map(score => (
                            <button
                              key={score}
                              className={`score-button ${additionalProgram.satisfaction === score ? 'selected' : ''}`}
                              onClick={() => setAdditionalProgram(prev => ({...prev, satisfaction: score}))}
                            >
                              {score}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {additionalProgram.participated === false && (
                      <div className="question">
                        <h3>왜 참여하지 않으셨나요?</h3>
                        <button onClick={() => setAdditionalProgram(prev => ({...prev, nonParticipationReason: "시간이 없어서"}))}>
                          시간이 없어서
                        </button>
                        <button onClick={() => setAdditionalProgram(prev => ({...prev, nonParticipationReason: "관심이 없어서"}))}>
                          관심이 없어서
                        </button>
                        <button onClick={() => setAdditionalProgram(prev => ({...prev, nonParticipationReason: "도움이 안될 것 같아서"}))}>
                          도움이 안될 것 같아서
                        </button>
                        <button onClick={() => setAdditionalProgram(prev => ({...prev, nonParticipationReason: "기타"}))}>
                          기타
                        </button>
                        {additionalProgram.nonParticipationReason === "기타" && (
                          <input
                            type="text"
                            className="other-reason-input"
                            placeholder="기타 사유를 입력해주세요"
                            value={additionalProgram.otherReason}
                            onChange={(e) => setAdditionalProgram(prev => ({...prev, otherReason: e.target.value}))}
                          />
                        )}
                      </div>
                    )}
                  </>
                )}

                <button 
                  className="start-survey-button"
                  onClick={() => {
                    if (additionalProgram.exists === null) {
                      alert('질문에 답해주세요.');
                      return;
                    }
                    if (additionalProgram.exists === true) {
                      if (!additionalProgram.name) {
                        alert('프로그램 이름을 입력해주세요.');
                        return;
                      }
                      if (additionalProgram.participated === null) {
                        alert('참여 여부를 선택해주세요.');
                        return;
                      }
                      if (additionalProgram.participated === true && !additionalProgram.satisfaction) {
                        alert('만족도를 선택해주세요.');
                        return;
                      }
                      if (additionalProgram.participated === false && !additionalProgram.nonParticipationReason) {
                        alert('참여하지 않은 이유를 선택해주세요.');
                        return;
                      }
                    }
                    setCurrentPage('additionalQuestions');
                  }}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        );
      case 'additionalSurvey':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="navigation-buttons">
                <button 
                  className="nav-button previous-button"
                  onClick={() => setCurrentPage('finalPage')}
                >
                  이전
                </button>
                <h2>온라인 초점집단면담 일정 확인</h2>
              </div>

              <div className="program-intro">
                <p>
                  안녕하세요.
                  <br />
                  연구에 참여해 주셔서 감사합니다.
                  <br />
                  <br />
                  아래 일정 중 오후 6:00~7:30에 진행될 온라인 초점집단 면담에 참석 가능하신 날짜를 선택해 주세요.                 
                </p>
                
                <div className="date-selection-container">
                  <div className="date-selection">
                    <h4>참석 가능 날짜 선택 (복수 선택 가능)</h4>
                    <div className="date-options" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedDates.includes('2025-02-24')}
                          onChange={() => handleDateSelection('2025-02-24')}
                        />
                        2025년 2월 24일 (월)
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedDates.includes('2025-02-25')} 
                          onChange={() => handleDateSelection('2025-02-25')}
                        />
                        2025년 2월 25일 (화)
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedDates.includes('2025-02-26')}
                          onChange={() => handleDateSelection('2025-02-26')}
                        />
                        2025년 2월 26일 (수)
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedDates.includes('2025-02-27')}
                          onChange={() => handleDateSelection('2025-02-27')}
                        />
                        2025년 2월 27일 (목)
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedDates.includes('2025-02-28')}
                          onChange={() => handleDateSelection('2025-02-28')}
                        />
                        2025년 2월 28일 (금)
                      </label>
                    </div>
                  </div>

                  <div className="alternative-date-section">
                    <h4>대체 일정 제안</h4>
                    <p>위 날짜 중 참석이 어려운 경우, 가능한 일정이 있으면 작성해 주세요.</p>
                    <textarea
                      value={alternativeDate}
                      onChange={(e) => setAlternativeDate(e.target.value)}
                      placeholder="예: 3월 1일 오후 2시~3시 30분"
                      rows="2"
                    />
                  </div>

                  <div className="contact-email-section">
                    <h4>연락 가능한 이메일 주소</h4>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="이메일 주소를 입력해주세요"
                    />
                  </div>

                  <div>
                    <p style={{fontSize: '1.05em'}}>
                      <br />
                      <br />

                      일정이 확정되면 다시 안내해 드리겠습니다.
                      <br />
                      다시 한 번 연구에 참여해 주셔서 감사합니다.
                    </p>
                    
                    <p className="signature" style={{fontSize: '1.05em'}}>
                    <br />


                      감사합니다.
                      <br />
                      연구팀 드림
                    </p>
                  </div>
                </div>
              </div>

              <button 
                className="start-survey-button"
                onClick={() => {
                  if (selectedDates.length === 0 && !alternativeDate) {
                    alert('참석 가능한 날짜를 선택하거나 대체 일정을 제안해주세요.');
                    return;
                  }
                  if (!contactEmail) {
                    alert('연락 가능한 이메일 주소를 입력해주세요.');
                    return;
                  }
                  setCurrentPage('surveyComplete');
                }}
              >
                제출하기
              </button>
            </div>
          </div>
        );
      case 'surveyComplete':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="thank-you">
                <h2>설문에 참여해 주셔서 감사합니다.</h2>
                <p>소중한 의견을 연구에 반영하도록 하겠습니다.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
