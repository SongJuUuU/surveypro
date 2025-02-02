import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const programs = [
    "멘토링 프로그램", "재학생 취업 현황 조사", "취업 설명회 및 공고 게시", "RC 101 - 재학생 및 졸업생 간담회",
    "연세 의·치·간 Bio & Medical Idea Fair", "국제 교류 프로그램 대학 및 간호대학 동아리 활동", "간호대학 동아리 활동", "졸업생 홈커밍 데이 및 취업 현황 조사",
    "복수전공", "연계전공", "부전공 설명회", "진로관련 소규모 세미나"
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
  const [showFinalQuestions, setShowFinalQuestions] = useState(false);
  const [finalResponses, setFinalResponses] = useState({});
  const [showFinalPage, setShowFinalPage] = useState(false);
  const [contactInfo, setContactInfo] = useState('');
  const [wantInterview, setWantInterview] = useState(null);

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
        nonParticipationReason: reason
      }
    }));
  }, [currentProgram]);

  const handleNextProgram = () => {
    setCurrentProgram(prev => prev + 1);
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
    
    startFutureCompetency();
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
    setCurrentProgram(programs.length);
    setShowExpectationScale(true);
  };

  const handleFinalResponse = (questionNumber, score) => {
    setFinalResponses(prev => ({
      ...prev,
      [questionNumber]: score
    }));
  };

  const handleExpectationSubmit = () => {
    if (Object.keys(expectationResponses).length < 4) {
      alert('모든 문항에 답변해주세요.');
      return;
    }
    setShowExpectationScale(false);
    setShowFinalQuestions(true);
  };

  const handleFinalSubmit = () => {
    if (Object.keys(finalResponses).length < 20) {
      alert('모든 문항에 답변해주세요.');
      return;
    }
    setShowFinalQuestions(false);
    setShowFinalPage(true);
  };

  const handleExpectationPrevious = () => {
    setShowExpectationScale(false);
    setCurrentProgram(programs.length);
  };

  const handleFinalQuestionsPrevious = () => {
    setShowFinalQuestions(false);
    setShowExpectationScale(true);
  };

  const handleFinalPagePrevious = () => {
    setShowFinalPage(false);
    setShowFinalQuestions(true);
  };

  if (showIntro) {
    return (
      <div className="App">
        <div className="survey-container intro-container">
          <h2>연구 참여 안내</h2>
          <div className="intro-content">
            <p>안녕하십니까?</p>
            <p>먼저, 바쁘신 와중에 소중한 시간을 할애해 주셔서 감사합니다.</p>
            <p>본 설문은 연세대학교 간호대학의 진로지도 프로그램에 대한 참여 경험 및 요구도를 탐색하여 
            효과적인 진로지도 개선 방안을 마련하고자 실시됩니다.</p>
            <p>귀하께서 응답하신 내용에 대해서는 모두 비밀이 보장될 것이며, 무기명 통계 자료로 학술연구 
            목적으로만 사용할 것입니다.</p>
            <p>귀하께서 본 연구에 참여를 원하지 않을 경우에는 언제라도 참여를 중단하실 수 있으며, 그로 인한 
            어떠한 불이익도 없음을 알려드립니다.</p>
            <p>귀하께서 응답하신 내용은 본 연구의 소중한 자료가 될 것이므로 성실한 답변을 부탁드리며, 연구에 
            관하여 궁금하신 사항이 있으시면 연구자에게 연락 주시기 바랍니다.</p>
            <p>귀한 시간 내어 본 연구에 참여해 주셔서 다시 한 번 진심으로 감사드립니다.</p>
            
            <div className="researcher-info">
              <div className="researcher-section">
                <h3>연구담당자</h3>
                <p>신유미 (YUSHIN23@yuhs.ac, 02-2228-3358)</p>
              </div>
              <div className="researcher-section">
                <h3>연구 책임자</h3>
                <p>김희정 (HKIM80@yuhs.ac, 02-2228-3273)</p>
              </div>
            </div>

            <button 
              className="start-survey-button"
              onClick={() => setShowIntro(false)}
            >
              설문 시작하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showDemographics) {
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
  }

  if (showFutureCompetency) {
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
            <p>연세대학교 간호대학은 미래의 건강사회를 이끌어갈 새로운 역량 개발을 위해</p>
            <ol>
              <li>치료적 돌봄을 제공하는 간호사</li>
              <li>창의융합적 건강전문가</li>
              <li>변화를 이끄는 글로벌 리더</li>
            </ol>
            <p>이 세 가지의 인재상이 있습니다. 각 인재상에 비추어 보았을 때, 본인은 각각의 항목에서 얼마나 준비되었다고 생각하나요?</p>
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
  }

  if (currentProgram >= programs.length) {
    return (
      <div className="App">
        <div className="survey-container">
          <div className="navigation-buttons">
            <button 
              className="nav-button previous-button"
              onClick={() => setCurrentProgram(programs.length - 1)}
            >
              이전
            </button>
            <h2>진로 관련 추가 설문</h2>
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
              onClick={() => {
                if (Object.keys(additionalResponses).length < 25) {
                  alert('모든 문항에 답변해주세요.');
                  return;
                }
                setShowExpectationScale(true);
              }}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showExpectationScale) {
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
              당신이 가장 원하는 직업을 생각하면서 자신에게 해당되는 번호에 O표 하시기 바랍니다.
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
                  <span>매우 적음</span>
                  <span>보통 정도</span>
                  <span>매우 많음</span>
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
  }

  if (showFinalQuestions) {
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
            <h2>진로 자기효능감</h2>
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
  }

  if (showFinalPage) {
    return (
      <div className="App">
        <div className="survey-container">
          <div className="navigation-buttons">
            <button 
              className="nav-button previous-button"
              onClick={handleFinalPagePrevious}
            >
              이전
            </button>
            <h2>설문 완료</h2>
          </div>

          <div className="final-page">
            <div className="contact-section">
              <p className="highlight">
                ★ 아래 연락처를 기입해주시는 분들께, 소정의 기프티콘(음료쿠폰 5천원)이 지급될 예정입니다. 
                연락처는 기프티콘 제공 이외의 목적으로 사용되지 않으며, 연구가 종료되면 안전하게 폐기됩니다.
              </p>
              <div className="contact-input">
                <span>연락처: </span>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="연락처를 입력해주세요"
                />
              </div>
            </div>

            <p className="highlight">★★ 온라인 설문조사에 참여해 주셔서 감사합니다.</p>

            <div className="interview-section">
              <h3>[연세대학교 간호대학 진로지도 경험 연구를 위한 집단 인터뷰 참여자 모집]</h3>
              <p>
                향후 연세대학교 간호대학생들의 진로 지도와 관련된 심층적인 경험을 탐구하기 위해 
                집단 인터뷰를 시행할 예정입니다. 집단 인터뷰에 참여하셔서 귀하의 소중한 경험과 
                의견을 나누어 주시면 연구에 큰 도움이 될 것입니다.
              </p>
              <p>
                집단 인터뷰에 참여를 원하십니까? (추가 사례금을 지급해드리며, 인터뷰에 대한 
                설명을 들으신 후에 참여 의향을 철회하셔도 됩니다.)
              </p>
              <div className="interview-buttons">
                <button
                  className={`demo-button ${wantInterview === true ? 'selected' : ''}`}
                  onClick={() => setWantInterview(true)}
                >네</button>
                <button
                  className={`demo-button ${wantInterview === false ? 'selected' : ''}`}
                  onClick={() => setWantInterview(false)}
                >아니요</button>
              </div>
            </div>

            <p className="thank-you">설문에 응답해 주셔서 감사합니다.</p>

            <button 
              className="start-survey-button"
              onClick={() => {
                alert('설문이 완료되었습니다. 참여해주셔서 감사합니다.');
                // 여기에 최종 제출 로직 추가
              }}
            >
              최종 제출
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentResponse = responses[programs[currentProgram]] || {};

  return (
    <div className="App">
      <div className="survey-container">
        <div className="navigation-buttons">
          {showPreviousButton() && (
            <button 
              className="nav-button previous-button"
              onClick={handlePreviousProgram}
            >
              이전
            </button>
          )}
          <h2>프로그램 설문조사</h2>
        </div>
        
        <div className="question">
          <h3>{programs[currentProgram]}에 대해서 알고계십니까?</h3>
          <button onClick={() => handleKnowledgeResponse("네")}>네</button>
          <button onClick={() => handleKnowledgeResponse("아니오")}>아니오</button>
        </div>

        {currentResponse.knows === "네" && (
          <div className="question">
            <h3>{programs[currentProgram]}에 참여해보신적이 있으십니까?</h3>
            <button onClick={() => handleParticipationResponse("네")}>네</button>
            <button onClick={() => handleParticipationResponse("아니오")}>아니오</button>
          </div>
        )}

        {currentResponse.knows === "네" && 
          currentResponse.participated === "네" && (
          <div className="question">
            <h3>{programs[currentProgram]}에 대한 만족도를 선택해주세요.</h3>
            <div className="score-labels">
              <span>매우 불만족</span>
              <span>보통</span>
              <span>매우 만족</span>
            </div>
            <div className="score-buttons">
              {[1, 2, 3, 4, 5].map(score => (
                <button
                  key={score}
                  className={`score-button ${currentResponse.satisfaction === score ? 'selected' : ''}`}
                  onClick={() => handleSatisfactionResponse(score)}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentResponse.knows === "네" && 
          currentResponse.participated === "아니오" && (
          <div className="question">
            <h3>왜 참여하지 않으셨나요?</h3>
            <button onClick={() => handleNonParticipationReason("시간이 없어서")}>
              시간이 없어서
            </button>
            <button onClick={() => handleNonParticipationReason("관심이 없어서")}>
              관심이 없어서
            </button>
            <button onClick={() => handleNonParticipationReason("도움이 안될 것 같아서")}>
              도움이 안될 것 같아서
            </button>
          </div>
        )}

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
  );
}

export default App;
