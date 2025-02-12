import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [consents, setConsents] = useState({
    consent1: null,
    consent2: null,
    consent3: null,
    consent4: null,
    consent5: null,
    consent6: null
  });
  
  // 개인정보 상태 추가
  const [personalInfo, setPersonalInfo] = useState({
    gender: '',
    age: '',
    graduationYear: '',
    workplace: '',
    yearsOfService: '',
    previousWorkplace: '',
    name: '',
    phone: '',
    email: '',
    preferredTime: '',
    schedules: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false
    },
  });

  const handleConsentChange = (consentId, value) => {
    setConsents(prev => ({
      ...prev,
      [consentId]: value
    }));
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'welcome':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="welcome-message">
                <div className="greeting">안녕하십니까?</div>
                
                <div className="intro-text">
                  <p>먼저, 바쁘신 와중에 소중한 시간을 할애해 주셔서 감사합니다.</p>
                  
                  <p>본 연구는 연세대학교 간호대학의 진로지도 프로그램에 대한 참여 경험 및 요구도를 탐색하여 
                효과적인 진로지도 개선 방안을 마련하고자 실시됩니다.</p>
                  
                  <p>귀하께서 응답하신 내용에 대해서는 모두 비밀이 보장될 것이며, 무기명 통계 자료로 학술연구 
                목적으로만 사용할 것입니다.</p>
                  
                  <p>귀하께서 본 연구에 참여를 원하지 않을 경우에는 언제라도 참여를 중단하실 수 있으며, 그로인한 
                어떠한 불이익도 없음을 알려드립니다.</p>
                  
                  <p>귀하께서 응답하신 내용은 본 연구의 소중한 자료가 될 것이므로 성실한 답변을 부탁드리며, 연구에 
                관하여 궁금하신 사항이 있으시면 연구자에게 연락 주시기 바랍니다.</p>
                  
                  <p>귀한 시간 내어 본 연구에 참여해 주셔서 다시 한 번 진심으로 감사드립니다.</p>
                </div>

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
                  onClick={() => setCurrentPage('explanation')}
                >
                  시작하기
                </button>
              </div>
            </div>
          </div>
        );

      case 'explanation':
        return (
          <div className="App">
            <div className="survey-container intro-container">
              <h2 style={{ textAlign: 'center' }}>대 상 자 설 명 문</h2>
              <div className="research-sections">
                <section>
                  <h3 style={{ display: 'inline-block', marginRight: '10px' }}>연구제목:</h3>
                  <p style={{ display: 'inline-block' }}>
                    '커리어 연세간호' 고도화 프로그램 개발을 위한 학생 진로 결정 요인 및 요구도 조사
                  </p>
                  
                  
                  <p className="intro-description" style={{ textAlign: 'left' }}>
                    이 설명문은 이 연구에 대한 귀하의 이해를 돕기 위해 마련된 것이고, 이 연구에 대한 자세한 내용을
                    담고 있으니 이 설명문을 읽고 충분히 이해하고 생각하신 후에 참여 여부를 결정해주시기 바랍니다.
                    원하시는 경우 가족이나 그 외의 사람들과 의논하셔도 됩니다.
                  </p>

                  <p style={{ textAlign: 'left' }}>
                    귀하께서 자발적으로 동의하여 동의서를 작성하시는 경우에 연구에 참여하실 수 있으며 귀하께서는
                    이 연구에 참여하지 않기로 결정할 수도 있습니다. 참여하지 않기로 결정하더라도 귀하께서 받게 될
                    치료에 아무런 영향을 주지 않을 것이며 그 외에 어떠한 불이익도 없을 것입니다.
                  </p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>1. 임상 연구 배경 및 목적</h3>
                  <p style={{ textAlign: 'left' }}>4차 산업시대와 다변화된 의료시장의 확대로 전반적인 의료의 질 향상 및 다층적 보건의료 대응의
                  필요성을 증대시키고, 전문 의료서비스와 돌봄 서비스 수요를 증가시킴에 따라, 간호사에 대한
                  사회적 기대 또한 높아지고 있습니다. 특히 다양한 건강요구에 대응할 수 있는 역량을 갖추고
                  디지털 기술을 활용한 학습 과정을 통해 지식과 기술을 습득할 수 있는 간호 인재 양성이
                  필수적입니다. 간호대학생이 미래 사회 역량 있는 구성원이자 리더로서 성장할 기회를 제공하기
                  위해 고도화된 진로지도 프로그램이 필요합니다. 이에 본 연구는 연세대학교 간호대학의 진로지도
                  프로그램에 대한 참여 경험 및 요구도를 탐색하여 효과적인 진로지도 개선 방안을 마련하고자
                  합니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>2. 임상연구에 참여하는 대상자 수 및 참여 기간</h3>
                  <p style={{ textAlign: 'left' }}>이 연구는 연세대학교 간호대학에서 주관하고, 연구 대상자는 연세대학교 간호대학 교육(실습, 강의,세미나 등) 혹은 비교과과정에 멘토로서 참여한 경험이 있는 간호실무자를 대상으로 이루어집니다. 한 그룹당 6-8 명, 총 두 그룹, 12-16 명이 참여할 예정이고, 연구 기간은 세브란스병원 연구심의의원회 승인 후부터 2025 년 10 월 31 일까지입니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>3. 임상연구의 절차 및 방법</h3>
                  <p style={{ textAlign: 'left' }}>귀하께서 본 연구에 참여하시기로 결정하셨다면, 대상자 동의서 양식에 서명하시게 됩니다. 동의서에 서명하신 이후에, 연세대학교 간호대학의 진로지도 프로그램 및 그 외 진로지도 프로그램에 대한 경험 등에 관한 질문에 대해 귀하께서 답변하시면 됩니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>4. 임상연구에 참여하여 기대할 수 있는 이익</h3>
                  <p style={{ textAlign: 'left' }}>귀하는 이 연구 참여로 인해 직접적인 이익은 없으나 궁극적으로 귀하의 참여는 효과적인 진로지도 프로그램을 개발하는데 큰 도움이 되며, 연세대학교 간호대학의 학생들이 미래 간호인력과 리더로서 성장하기 위한 시스템 구축에 기여를 할 것입니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>5. 임상연구에 참여하여 예상되는 위험 및 불편</h3>
                  <p style={{ textAlign: 'left' }}>그룹 인터뷰를 위한 약 60-90 분 정도의 시간적 부담이 있을 수 있지만, 그 외의 연구와 관련된 불편감 및 예상되는 위험성은 없습니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>6. 임상연구 참여에 따른 비용</h3>
                  <p style={{ textAlign: 'left' }}>본 연구는 조사연구로 연구참여로 인한 비용이 발생하지 않습니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>7. 임상연구 참여에 따른 사례비</h3>
                  <p style={{ textAlign: 'left' }}>귀하가 설문조사에 참여하여 협조해주신 것에 대한 감사의 마음으로 50,000원 상당의 모바일 쿠폰을 드립니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>8. 연구와 관련한 손상이 발생한 경우, 대상자에게 주어질 보상이나 치료방법</h3>
                  <p style={{ textAlign: 'left' }}>설문조사에 참여하는 동안 시간적 부담이 있을 수 있으나, 침습적인 검사가 포함되지 않으므로 신체적 불편이나 연구와 관련된 심각한 위험은 예상되지 않습니다. 다만, 설문지 작성 중 심리적 피로감이 발생할 경우, 어떠한 불이익 없이 언제든지 연구 참여를 중단하실 수 있습니다. 본 연구 참여로 인해 발생할 수 있는 손실(시간 소모, 심리적 피로감 등)에 대한 별도의 금전적 보상이나 치료 지원은 제공되지 않습니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>9. 새로운 정보 제공 여부</h3>
                  <p style={{ textAlign: 'left' }}>본 연구는 60-90 분 정도가 소요되는 1 회의 초점집단면담으로 연구진행 중 귀하에게 영향을 줄 수 있는 새로운 정보는 없을 것입니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>10. 대상자가 준수하여야 하는 사항</h3>
                  <p style={{ textAlign: 'left' }}>본 연구는 60-90 분 정도가 소요되는 1 회의 초점집단면담으로 귀하가 준수해야 하는 사항은 없습니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>11. 임상연구 참여에서의 중도 탈락</h3>
                  <p style={{ textAlign: 'left' }}>• 연구에 참여는 자율적으로 결정하는 것입니다.<br/>
                      • 연구 참여 이후 언제라도 연구 참여를 그만둘 수 있습니다.<br/>
                      • 연구에 참여하지 않거나 중도에 그만 두기로 결정하더라도 귀하에 대한 어떠한 불이익이 발생하지 않을 것입니다.
                  </p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>12. 정보 수집 및 제공</h3>
                  <p style={{ textAlign: 'left' }}>본 동의서에 서명함으로써 귀하는 연구진이 귀하의 개인(민감)정보를 수집하고 사용하는데 동의하게 됩니다.</p>
                  <p className="highlight" style={{ textAlign: 'left' }}>※ 자세한 사항은 아래 내용을 참조하여 주십시오.</p>
                  
                  <div className="info-details">
                    <h4 style={{ textAlign: 'left' }}>1) 개인(민감)정보의 수집∙이용 목적</h4>
                    <p style={{ textAlign: 'left' }}>
                      초점집단면담에 참여 동의 시 연구 참여 및 모바일 쿠폰 발송을 위한 연락을 위해,
                      전화번호 정보가 수집되며 연구 종료 시, 즉시 파기됩니다. 그 외 개인정보는 연구 결과
                      분석을 위해서만 사용됩니다.
                    </p>
                    
                    <h4 style={{ textAlign: 'left' }}>2) 수집하려는 개인(민감)정보 항목</h4>
                    <div style={{ textAlign: 'left' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <tbody>
                          <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>개인정보</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>성명 또는 이니셜, 전화번호, 나이, 직업, 졸업연도, 근무지, 근무연수</td>
                          </tr>
                          <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>민감정보</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>해당 없음.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 style={{ textAlign: 'left' }}>3) 개인(민감)정보의 보유 및 이용 기간</h4>
                    <p style={{ textAlign: 'left' }}>
                      귀하의 개인(민감)정보는 연구를 위해 최대 3년간 사용되며 수집된
                      개인정보는 개인정보보호법에 따라 적절히 관리됩니다.
                    </p>

                    <h4 style={{ textAlign: 'left' }}>4) 귀하는 위 개인(민감)정보 수집 및 이용, 제공에 대한 수락 여부를 자유롭게 결정할 수
                      있습니다. 귀하가 개인(민감)정보 수집 및 이용, 제공에 수락하지 않은 겨우 사례품을
                      받으실 수 없습니다.</h4>

                    <h4 style={{ textAlign: 'left' }}>5) 귀하가 동의할 경우, 이 연구 목적 이외의 연구 자료의 2차 분석을 위한
                      목적으로 사용 및 타인에게 해당 정보가 제공될 수도 있습니다.</h4>
                  </div>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>13. 개인정보 및 기록에 대한 비밀보장</h3>
                  <p style={{ textAlign: 'left' }}>귀하가 이 연구에 참여하는 동안에 수집되는 귀하의 기록은 비밀로 보장될 것이며, 연구의 결과가 보고서로 작성되거나 출판, 또는 발표되는 경우에도 귀하의 신원을 파악할 수 있는 기록은 비밀 상태로 유지될 것입니다.</p>
                  <p style={{ textAlign: 'left' }}>귀하 또는 귀하의 대리인이 본 동의서에 서명함으로써, 귀하는 이 연구를 모니터/점검하는 자, 연구심의위원회, 관계 부처 (예: 보건복지부) 등이 귀하의 비밀 보장을 침해하지 않고 관련 규정이 정하는 범위 안에서 연구의 실시 절차와 자료의 신뢰성을 검증하기 위해 귀하의 의무기록을 열람하는 것에 대하여 동의하게 됩니다.</p>
                  <p style={{ textAlign: 'left' }}>연구목적으로 수집된 개인정보는 성명 또는 이니셜, 성별, 학년, 누적 학업 성취도입니다. 이 정보는
연구를 위해 3 년간 사용되며 수집된 정보는 개인정보보호법에 따라 적절히 관리됩니다. 관련정보는
열쇠로만 접근이 가능한 연구실 내 컴퓨터에 보관합니다. 수집된 1 차 자료는 즉시 코딩하여 파일로
보관 가능한 2 차 자료로 변환되어 연구 책임자의 컴퓨터에 보관될 것입니다. 이 컴퓨터는
연구책임자만 식별할 수 있는 암호를 입력하여 접근이 가능하며 각 데이터 파일도 비밀번호를
입력하여 접근할 수 있도록 하여 개인정보가 노출되지 않도록 관리할 것이며, 연구와 관련된 기록은
연구종료 후 3 년간 보관 후 컴퓨터의 포멧을 통해 폐기될 것입니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>14. 참여/철회의 자발성</h3>
                  <p style={{ textAlign: 'left' }}>귀하는 언제든지 연구 참여에 대한 동의를 철회할 수 있으며, 철회 시 연구 참여는 종료되고 연구진은 추가적인 정보를 수집하지 않습니다. 다만, 철회 이전에 수집된 정보는 연구 분석 및 결과 보고를 위해 익명 처리된 상태로 계속 활용될 수 있습니다.</p>
                  <p style={{ textAlign: 'left' }}>만약 수집된 정보를 폐기하고 연구에 이용되지 않기를 원하신다면, 연구자에게 연락하여 의사를 전달해 주시기 바랍니다.</p>
                  <p style={{ textAlign: 'left' }}>또한, 귀하는 본 연구에 참여하지 않을 자유가 있으며, 참여하지 않거나 중도 철회하더라도 어떠한 불이익도 발생하지 않습니다.</p>
                </section>

                <section>
                  <h3 style={{ textAlign: 'left' }}>15. 연락처</h3>
                  <p style={{ textAlign: 'left' }}>이 연구에 관하여 궁금한 점이 있거나 연구와 관련이 있는 상해가 발생한 경우에는 아래의 연구자에게 연락하여 주십시오.</p>
                  <div className="contact-info" style={{ textAlign: 'left' }}>
                    <p>연구자 성명: 김희정</p>
                    <p>연구자 주소: 03722 서울특별시 서대문구 연세로 50-1</p>
                    <p>☎ 02-2228-3273</p>
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
                    setCurrentPage('personalInfo');
                  }}
                >
                  동의하고 설문 시작하기
                </button>
              </div>
            </div>
          </div>
        );

      case 'personalInfo':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="personal-info-form" style={{ 
                maxWidth: '800px', 
                margin: '0 auto', 
                padding: '40px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{ 
                  textAlign: 'center', 
                  marginBottom: '40px', 
                  color: '#2c3e50',
                  fontSize: '28px',
                  fontWeight: '600'
                }}>기본 정보 입력</h2>
                
                <div style={{ 
                  display: 'grid', 
                  gap: '30px',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  <div className="form-group">
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600',
                      color: '#34495e',
                      fontSize: '16px'
                    }}>
                      성별을 선택해주세요. <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <div style={{ 
                      display: 'flex', 
                      gap: '30px',
                      backgroundColor: '#f8f9fa',
                      padding: '15px 20px',
                      borderRadius: '8px'
                    }}>
                      {['남자', '여자'].map(gender => (
                        <label key={gender} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px',
                          cursor: 'pointer'
                        }}>
                          <input
                            type="radio"
                            name="gender"
                            value={gender}
                            onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                            style={{ cursor: 'pointer' }}
                          />
                          {gender}
                        </label>
                      ))}
                    </div>
                  </div>

                  {[
                    { id: 'age', label: '나이를 입력해주세요. (만 나이)', type: 'number', placeholder: '예: 25' },
                    { id: 'graduationYear', label: '졸업연도를 입력해주세요.', type: 'number', placeholder: '예: 2015' },
                    { id: 'workplace', label: '현재 근무지를 입력해주세요.', type: 'text', placeholder: '현재 근무하고 있는 병원이나 기관명을 작성해주세요.' },
                    { id: 'yearsOfService', label: '현재 근무지의 근속 연수를 입력해주세요.', type: 'text', placeholder: '현재 근무지에서 일한 연수를 작성해주세요. 예: 3년' }
                  ].map(field => (
                    <div key={field.id} className="form-group">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '12px', 
                        fontWeight: '600',
                        color: '#34495e',
                        fontSize: '16px'
                      }}>
                        {field.label} <span style={{ color: '#e74c3c' }}>*</span>
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={(e) => handlePersonalInfoChange(field.id, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          border: '1px solid #e1e1e1',
                          borderRadius: '8px',
                          fontSize: '15px',
                          backgroundColor: '#f8f9fa',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                      />
                    </div>
                  ))}

                  <div className="form-group">
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600',
                      color: '#34495e',
                      fontSize: '16px'
                    }}>
                      이전 근무했던 병원이나 기관명을 입력해주세요.
                    </label>
                    <textarea
                      placeholder="이전 근무했던 병원이나 기관명을 작성하고, 근속 연수를 함께 작성해주세요. 예: 근무지명: ABC병원, 근속연수: 2년"
                      onChange={(e) => handlePersonalInfoChange('previousWorkplace', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '1px solid #e1e1e1',
                        borderRadius: '8px',
                        fontSize: '15px',
                        backgroundColor: '#f8f9fa',
                        minHeight: '120px',
                        resize: 'vertical',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginTop: '40px',
                  gap: '20px'
                }}>
                  <button 
                    onClick={() => setCurrentPage('consent')}
                    style={{
                      padding: '12px 25px',
                      backgroundColor: '#f1f2f6',
                      color: '#2c3e50',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    이전
                  </button>
                  <button 
                    onClick={() => {
                      const requiredFields = ['gender', 'age', 'graduationYear', 'workplace', 'yearsOfService'];
                      const missingFields = requiredFields.filter(field => !personalInfo[field]);
                      
                      if (missingFields.length > 0) {
                        alert('필수 항목을 모두 입력해주세요.');
                        return;
                      }
                      setCurrentPage('scheduleContact');
                    }}
                    style={{
                      padding: '12px 30px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    다음
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'scheduleContact':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="schedule-contact-form" style={{ 
                maxWidth: '800px', 
                margin: '0 auto', 
                padding: '40px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{ 
                  textAlign: 'center', 
                  marginBottom: '40px', 
                  color: '#2c3e50',
                  fontSize: '28px',
                  fontWeight: '600'
                }}>면담 일정 선택 및 연락처 정보</h2>
                
                <div style={{ 
                  display: 'grid', 
                  gap: '30px',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  <div className="form-group">
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '15px', 
                      fontWeight: '600',
                      color: '#34495e',
                      fontSize: '16px'
                    }}>
                      면담 가능한 날짜를 선택해주세요. (복수 선택 가능) <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <div style={{ 
                      display: 'grid',
                      gap: '12px',
                      backgroundColor: '#f8f9fa',
                      padding: '20px',
                      borderRadius: '8px'
                    }}>
                      {[
                        { date: '2월 24일 월요일', value: 'monday' },
                        { date: '2월 25일 화요일', value: 'tuesday' },
                        { date: '2월 26일 수요일', value: 'wednesday' },
                        { date: '2월 27일 목요일', value: 'thursday' },
                        { date: '2월 28일 금요일', value: 'friday' }
                      ].map((day) => (
                        <label key={day.value} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          cursor: 'pointer',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          transition: 'background-color 0.3s ease'
                        }}>
                          <input
                            type="checkbox"
                            value={day.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              const isChecked = e.target.checked;
                              setPersonalInfo(prev => ({
                                ...prev,
                                schedules: {
                                  ...prev.schedules,
                                  [value]: isChecked
                                }
                              }));
                            }}
                            style={{ 
                              width: '18px', 
                              height: '18px',
                              cursor: 'pointer'
                            }}
                          />
                          {day.date}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600',
                      color: '#34495e',
                      fontSize: '16px'
                    }}>
                      위 시간이 어려우신 경우, 선호하시는 시간대를 자유롭게 작성해주세요.
                    </label>
                    <textarea
                      placeholder="예: 3월 첫째주 월요일 오후 2시 이후 가능합니다."
                      onChange={(e) => handlePersonalInfoChange('preferredTime', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '1px solid #e1e1e1',
                        borderRadius: '8px',
                        fontSize: '15px',
                        backgroundColor: '#f8f9fa',
                        minHeight: '80px',
                        resize: 'vertical',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      marginTop: '8px',
                      fontStyle: 'italic'
                    }}>
                      * 구체적인 날짜와 시간대를 작성해 주시면 일정 조율에 도움이 됩니다.
                    </p>
                  </div>

                  {[
                    { id: 'name', label: '이름', type: 'text', placeholder: '이름을 입력해주세요' },
                    { id: 'phone', label: '전화번호', type: 'tel', placeholder: '예: 010-1234-5678' },
                    { id: 'email', label: '이메일', type: 'email', placeholder: '예: example@email.com' }
                  ].map(field => (
                    <div key={field.id} className="form-group">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '12px', 
                        fontWeight: '600',
                        color: '#34495e',
                        fontSize: '16px'
                      }}>
                        {field.label} <span style={{ color: '#e74c3c' }}>*</span>
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={(e) => handlePersonalInfoChange(field.id, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          border: '1px solid #e1e1e1',
                          borderRadius: '8px',
                          fontSize: '15px',
                          backgroundColor: '#f8f9fa',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginTop: '40px',
                  gap: '20px'
                }}>
                  <button 
                    onClick={() => setCurrentPage('personalInfo')}
                    style={{
                      padding: '12px 25px',
                      backgroundColor: '#f1f2f6',
                      color: '#2c3e50',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    이전
                  </button>
                  <button 
                    onClick={() => {
                      const { name, phone, email, schedules } = personalInfo;
                      if (!name || !phone || !email) {
                        alert('이름, 전화번호, 이메일을 모두 입력해주세요.');
                        return;
                      }
                      
                      const hasSelectedSchedule = schedules && Object.values(schedules).some(v => v);
                      if (!hasSelectedSchedule) {
                        alert('면담 가능한 날짜를 최소 하나 이상 선택해주세요.');
                        return;
                      }

                      setCurrentPage('completion');
                    }}
                    style={{
                      padding: '12px 30px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    제출하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'completion':
        return (
          <div className="App">
            <div className="survey-container">
              <div className="completion-message" style={{
                maxWidth: '600px',
                margin: '50px auto',
                padding: '40px',
                textAlign: 'center',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{ marginBottom: '30px' }}>
                  <h2 style={{ color: '#333', marginBottom: '20px' }}>연구 참여 신청이 완료되었습니다</h2>
                  <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#666' }}>
                    연구원이 곧 연구 참여를 위한 자세한 안내를 드릴 예정입니다.
                    <br />
                    입력하신 연락처로 안내드리도록 하겠습니다.
                  </p>
                </div>
                
                <div style={{ marginTop: '40px' }}>
                  <p style={{ color: '#888', fontSize: '0.9em' }}>
                    문의사항이 있으시면 연구팀에 연락 주시기 바랍니다.
                    <br />
                    연구에 참여해 주셔서 감사합니다.
                  </p>
                </div>
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
