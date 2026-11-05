//제목, 분야, 문서타입, 내용 등 신청 정보

//신청한 챌린지의 기본 정보
export default function ApplicationInfo({ application }) {
  return (
    <section>
      <h1>{application.title}</h1>

      <div>
        <span>분야: {application.category}</span>
        <span>문서 타입: {application.documentType}</span>
      </div>

      <p>{application.content}</p>

      <div>
        <p>마감일: {application.desiredDeadline}</p>
        <p>최대 인원: {application.maxParticipants}명</p>
      </div>

      <a href={application.sourceUrl} target="_blank" rel="noopener noreferrer">
        원문 보기
      </a>
    </section>
  );
}
