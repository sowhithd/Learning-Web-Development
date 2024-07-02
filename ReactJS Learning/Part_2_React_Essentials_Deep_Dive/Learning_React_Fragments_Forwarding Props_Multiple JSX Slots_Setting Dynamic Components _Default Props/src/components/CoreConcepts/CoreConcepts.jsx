import CoreConcept from "../CoreConcept/CoreConcept";
import { CORE_CONCEPTS } from "../../data";
import Section from "../Section/Section";

export default function CoreConcepts() {
  return (
    <Section title={"Core Concepts"} id="core-concepts">
      <ul>
        {CORE_CONCEPTS.map((item) => (
          <CoreConcept key={item.title} data={item} />
        ))}
      </ul>
    </Section>
  );
}
