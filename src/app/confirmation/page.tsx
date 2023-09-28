import ButtonBack from "@/components/ButtonBack"
import Summary from "@/components/Summary"
import Title from "@/components/Title"

const Confirmation = () => {
  return (
    <main className="flex flex-col gap-8 py-12 px-10">
      <ButtonBack />
      <Title>Finalización</Title>
      <Summary
        data={{
          name: "Gianluca Bredice",
          phone: "2281-599471",
          day: "21 de Septiembre",
          hour: "16:00",
        }}
      />
    </main>
  )
}

export default Confirmation
