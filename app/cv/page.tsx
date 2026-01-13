export default function Page() {
  return (
    <section className="max-w-4xl">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Curriculum Vitae
      </h1>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Education</h2>
        
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium">Technical University of Berlin</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">M.Sc. in Computer Engineering (3.0/4.0)</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2025/04 – 2026/09</p>
          </div>
          <p className="text-sm mt-1">Berlin, Germany</p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium">University of Erlangen-Nuremberg</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">M.Sc. in Medical Engineering, Grade: 1.8 (3.2/4.0)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Teaching Assistant of Biomedical Signal Analysis</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2023/10 - 2025/03</p>
          </div>
          <p className="text-sm mt-1">Erlangen, Germany (Transferred from)</p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium">Shanghai Jiao Tong University</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">University of Michigan – Shanghai Jiao Tong University Joint Institute</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">B.Eng. in Electrical and Computer Engineering, GPA: 2.7/4.0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Minor in Data Science. Degree taught entirely in English.</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2017/09 - 2023/06</p>
          </div>
          <p className="text-sm mt-1">Shanghai, China</p>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Experience</h2>

        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium">ITER Organization</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI Proof-of-Concept Intern</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2025/09 – 2026/02</p>
          </div>
          <p className="text-sm mt-1 mb-2">Saint-Paul-lez-Durance, France</p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li>
              <strong>Real-time document type suggestion:</strong> Engineered a high-throughput inference service for document classification (50+ types) using FastAPI, ModernBERT on vLLM and vector search. Achieved &gt;90% Top-3 Micro AP while maintaining &lt;3s latency under heavy load (30 concurrent requests, ~700 tokens/req).
            </li>
            <li>
              <strong>Event-Driven AI Agent for IT Support:</strong> Architected a scalable Chain-of-Agents system using LangGraph and RabbitMQ to orchestrate Jira ticket resolution. Integrated SAP, Jira, and Confluence MCPs for context-aware reasoning, automating resolution paths, and suggestions for 100+ tickets daily.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium">ANKI Lab, University of Erlangen-Nuremberg</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Research Assistant</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2024/04 – 2024/07</p>
          </div>
          <p className="text-sm mt-1 mb-2">Germany</p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li>Designed and implemented a biomedical video segmentation workflow with PyTorch</li>
          </ul>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium">Shanghai SmartState Co. Ltd.</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Product Management Intern</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2021/05 – 2021/08</p>
          </div>
          <p className="text-sm mt-1 mb-2">Shanghai, China</p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li>Conducted market analysis and procurement of 3D CAD software for a novel GenAI product (generating CNC file)</li>
          </ul>
        </div>
      </section>

      {/* Personal Projects */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal Projects</h2>

        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium">Individual Developer</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2025/12 – Present</p>
          </div>
          <div className="mt-2 space-y-3">
            <div>
              <p className="text-sm font-medium">Open-Source Contributions:</p>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Actively contributing to high-profile Rust projects including nushell and uutils/coreutils, focusing on bug fix</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium">System Programming with Rust:</p>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Implementing a SQLite clone from scratch to master low-level storage engines, B-tree indexing, and memory management in Rust.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium">LoRA merging for Continual Learning of Pretrained Vision Transformer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Research Project, RSiM Lab, BIFOLD Berlin</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2025/04 – 2025/08</p>
          </div>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
            <li>Integrated LoRA into SpectralGPT (ViT) to enable multi-modal (Spectral/Visual) processing for remote sensing tasks.</li>
            <li>Conducted performance benchmarking on high-performance computing (HPC) clusters to evaluate model scalability.</li>
            <li>Implemented LoRA merging strategies to mitigate catastrophic forgetting in Continual Learning, achieving 50% macroAP retention.</li>
          </ul>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium">Feed-Forward Network (FFN) with CUDA for Data and Model Parallelism</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Course Project, Multi-core Architecture and Programming, University of Erlangen-Nuremberg</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2024/04 - 2024/07</p>
          </div>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
            <li>Developed a FFN from scratch using C++/CUDA, implementing custom kernels without external libraries</li>
            <li>Architected and compared Data Parallelism (DP) and Model Parallelism (MP) schemas with CUDA Stream to emulate parallel computing on single GPU, optimizing training throughput</li>
            <li>Benchmarked their performance on MNIST, achieving 30% training speedup for DP with no accuracy degradation and 60% for MP with minimal accuracy degradation</li>
          </ul>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium">BERT on ARM: Training on Server and Real-time Inference on Edge</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Bachelor Thesis, Efficient and High Performance Computing Lab, Shanghai Jiao Tong University</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2021/09 - 2022/01</p>
          </div>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
            <li>Orchestrated a computational offloading schema for Huggingface transformers to balance compute loads between cloud servers and NVIDIA Jetson edge devices</li>
            <li>Optimized transformer inference on ARM architectures, achieving real-time latency for Question Answering tasks</li>
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Programming Languages:</strong> Python (Proficient), C++ (CUDA), Rust (System Programming)
          </div>
          <div>
            <strong>Web:</strong> FastAPI, PostgreSQL, Streamlit, RabbitMQ
          </div>
          <div>
            <strong>AI/ML:</strong> PyTorch, LangChain, Vector DB
          </div>
          <div>
            <strong>Infrastructure:</strong> Docker, Git, Google Cloud, OpenStack, Slurm
          </div>
          <div>
            <strong>Languages:</strong> English (TOEFL 110), German (C1), Mandarin (Native)
          </div>
        </div>
      </section>
    </section>
  )
}
