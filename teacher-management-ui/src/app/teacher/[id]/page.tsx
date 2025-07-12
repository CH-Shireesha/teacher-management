import Layout from "@/components/Layout"
import TeacherDetails from "@/pages/TeacherDetails"

interface TeacherDetailsPageProps {
  params: {
    id: string
  }
}

export default function TeacherDetailsPage({ params }: TeacherDetailsPageProps) {
  return (
    <Layout>
      <TeacherDetails teacherId={params.id} />
    </Layout>
  )
} 