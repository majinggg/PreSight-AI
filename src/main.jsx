import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, BarChart3, Check, Database, ExternalLink, FileText, Trash2,
  Globe2, Info, Lightbulb, LoaderCircle, Network, ShieldCheck, Sparkles,
  Target, TrendingUp, Upload, Users
} from 'lucide-react'
import './styles.css'

const CASES = {
  growth: {
    label: 'AI 产品增长 Copilot',
    description: '面向互联网产品团队的 AI 增长分析工具，连接埋点、用户反馈和竞品信息，自动发现增长机会并生成实验建议。',
    score: 86,
    verdict: '建议进入',
    segment: '50–500 人、已有数据基础的互联网产品团队',
    market: { sam: '¥9.6B', som: '¥480M', growth: '+31.6%' },
    competitors: '32 个',
    confidence: '中高',
    insight: '增长工具市场不缺数据看板，但“从用户信号到可执行实验”的闭环仍然不完整。',
    opportunities: [
      { title: '从机会到实验', text: '从行为信号直接生成增长假设、实验设计和成功指标。', tone: 'purple' },
      { title: '反馈自动聚类', text: '把评论、工单和访谈归纳成高频问题，并关联用户群。', tone: 'blue' },
      { title: '自然语言复盘', text: '用一句话追问转化变化，自动解释原因并引用数据证据。', tone: 'green' },
    ],
    mvp: ['接入埋点与用户反馈', '增长机会优先级评分', '实验方案自动生成'],
    sources: [
      { label: 'Similarweb Website Traffic Checker', type: '流量与渠道', reason: '用于判断竞品网站规模、访问趋势和获客来源。', url: 'https://www.similarweb.com/website/' },
      { label: 'Google Trends：AI 产品增长', type: '需求趋势', reason: '用于观察相关需求的搜索热度和时间趋势。', url: 'https://trends.google.com/trends/' },
      { label: 'Google Ads Keyword Planner', type: '关键词需求', reason: '用于补充用户主动搜索的关键词和需求强度。', url: 'https://ads.google.com/home/tools/keyword-planner/' },
    ],
  },
  customer: {
    label: 'B2B AI 客服 SaaS',
    description: '面向 50–500 人企业的多渠道 AI 客服，接入知识库、工单与人工坐席，降低重复咨询成本。',
    score: 76,
    verdict: '谨慎进入',
    segment: '有高频售前咨询的中小企业',
    market: { sam: '¥8.1B', som: '¥324M', growth: '+29.4%' },
    competitors: '28 个',
    confidence: '中高',
    insight: '通用客服市场竞争激烈，建议从垂直行业知识库与人工协同切入。',
    opportunities: [
      { title: '垂直知识库', text: '针对垂直行业提供模板化知识结构和回答质量评测。', tone: 'purple' },
      { title: '人机协同', text: '高风险问题自动转人工，并保留完整上下文。', tone: 'blue' },
      { title: '回答可解释', text: '引用知识来源，降低企业对错误回答的担忧。', tone: 'green' },
    ],
    mvp: ['知识库导入与切片', '引用来源的 AI 问答', '人工转接与工单'],
    sources: [
      { label: 'Similarweb Website Traffic Checker', type: '流量与渠道', reason: '用于判断同类客服产品的网站规模和流量来源。', url: 'https://www.similarweb.com/website/' },
      { label: 'Google Ads Keyword Planner', type: '关键词需求', reason: '用于验证企业是否在主动搜索 AI 客服解决方案。', url: 'https://ads.google.com/home/tools/keyword-planner/' },
      { label: 'Intercom Fin AI Agent', type: '竞品产品页', reason: '用于对照成熟竞品的功能边界和产品定位。', url: 'https://www.intercom.com/fin' },
    ],
  },
  knowledge: {
    label: '企业知识协作 SaaS',
    description: '帮助 100–1000 人企业把分散在文档、IM 与工单中的知识，转化为可检索、可协作的工作助手。',
    score: 88,
    verdict: '优先进入',
    segment: '知识密集型、跨部门协作企业',
    market: { sam: '¥6.5B', som: '¥260M', growth: '+34.1%' },
    competitors: '25 个',
    confidence: '中高',
    insight: '企业愿意为“找到答案”和“减少新人培训”付费，但安全和权限是购买前提。',
    opportunities: [
      { title: '跨系统搜索', text: '在权限边界内连接文档、IM、工单与 CRM。', tone: 'purple' },
      { title: '答案带证据', text: '回答附来源、更新时间和责任人，方便核验。', tone: 'blue' },
      { title: '知识缺口发现', text: '识别高频无答案问题，驱动团队补齐内容。', tone: 'green' },
    ],
    mvp: ['连接 2–3 个数据源', '权限同步与语义检索', '引用来源与反馈'],
    sources: [
      { label: 'Google Trends：企业知识库', type: '需求趋势', reason: '用于观察企业知识管理和 AI 搜索需求的变化。', url: 'https://trends.google.com/trends/' },
      { label: 'Notion AI 产品页', type: '竞品产品页', reason: '用于对照知识协作产品的核心功能和定价方式。', url: 'https://www.notion.so/product/ai' },
      { label: 'Glean 产品页', type: '竞品产品页', reason: '用于分析企业搜索类产品的定位和功能边界。', url: 'https://www.glean.com/product' },
    ],
  },
}

const EMPTY_ANALYSIS = {
  score: 0,
  verdict: '等待分析',
  segment: '输入产品想法后生成',
  market: { sam: '—', som: '—', growth: '—' },
  competitors: '—',
  confidence: '—',
  competitorProfiles: [],
  insight: '输入你的产品想法，PreSight AI 会检索公开来源并生成针对性的市场判断。',
  opportunities: [],
  mvp: [],
  sources: [],
}

function App() {
  const [activeCase, setActiveCase] = useState('growth')
  const [idea, setIdea] = useState('')
  const [analyzed, setAnalyzed] = useState(true)
  const [running, setRunning] = useState(false)
  const [retrievalStep, setRetrievalStep] = useState(0)
  const [foundSources, setFoundSources] = useState([])
  const [retrievalSources, setRetrievalSources] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchError, setSearchError] = useState('')
  const [analysisError, setAnalysisError] = useState('')
  const [liveSearch, setLiveSearch] = useState(false)
  const [analysisData, setAnalysisData] = useState(EMPTY_ANALYSIS)
  const [hasAnalysis, setHasAnalysis] = useState(false)
  const [needsAnalysis, setNeedsAnalysis] = useState(false)
  const [adsPowerMessage, setAdsPowerMessage] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploadedData, setUploadedData] = useState(null)
  const [uploadMessage, setUploadMessage] = useState('')
  const [history, setHistory] = useState(() => { try { return JSON.parse(localStorage.getItem('presight-history') || '[]') } catch { return [] } })
  const [historyView, setHistoryView] = useState(false)
  const data = analysisData

  const chooseCase = (key) => {
    setActiveCase(key)
    setIdea(CASES[key].description)
    setAnalyzed(true)
    setRetrievalStep(0)
    setFoundSources([])
    setRetrievalSources([])
    setSearchResults([])
    setSearchError('')
    setAnalysisError('')
    setLiveSearch(false)
    setAnalysisData(EMPTY_ANALYSIS)
    setHasAnalysis(false)
    setNeedsAnalysis(false)
  }

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return
    const file = files[0]
    const basicFile = { name: file.name, size: file.size, type: file.type }
    setUploadedFiles(current => {
      const merged = [...current, basicFile]
      return merged.filter((item, index, list) => list.findIndex(fileItem => fileItem.name === item.name && fileItem.size === item.size) === index)
    })
    setUploadMessage('正在解析文件…')
    const structured = /\.(csv|xlsx?|xls)$/i.test(file.name)
    if (!structured) {
      setUploadMessage('文件已添加；PDF/Word 暂不参与结构化数据计算。')
      event.target.value = ''
      return
    }
    try {
      const form = new FormData()
      form.append('file', file)
      const response = await fetch('/api/upload-data', { method: 'POST', body: form })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || '文件解析失败。')
      setUploadedData(payload)
      setUploadMessage(`已解析 ${payload.rowCount} 行，识别 ${payload.headers.length} 个字段。`)
    } catch (error) {
      setUploadMessage(error.message)
    }
    event.target.value = ''
  }

  const openAdsPower = async () => {
    setAdsPowerMessage('正在启动 AdsPower…')
    try {
      const response = await fetch('/api/adspower/open', { method: 'POST' })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'AdsPower 启动失败。')
      setAdsPowerMessage('已启动 AdsPower Profile，请在其中打开 Sensor Tower。')
    } catch (error) {
      setAdsPowerMessage(error.message)
    }
  }

  const deleteHistoryItem = (item) => {
    setHistory(current => {
      const next = current.filter(entry => !(entry.query === item.query && entry.at === item.at))
      localStorage.setItem('presight-history', JSON.stringify(next))
      return next
    })
  }

  const analyze = async () => {
    const query = idea.trim()
    if (!query || running) return

    setNeedsAnalysis(false)
    setRunning(true)
    setAnalyzed(false)
    setRetrievalStep(0)
    setFoundSources([])
    setSearchResults([])
    setSearchError('')
    setAnalysisError('')
    setLiveSearch(false)
    setHasAnalysis(false)

    try {
      const searchResponse = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const searchPayload = await searchResponse.json()
      if (!searchResponse.ok) throw new Error(searchPayload.error || '搜索失败，请稍后重试。')

      const results = Array.isArray(searchPayload.results) ? searchPayload.results : []
      const sources = results.map((result) => ({
        label: result.title,
        type: result.source || '公开网页',
        reason: result.content || '已找到相关公开页面。',
        url: result.url,
      }))
      setSearchResults(results)
      setRetrievalSources(sources)
      setLiveSearch(true)

      sources.forEach((source, index) => {
        window.setTimeout(() => {
          setFoundSources(current => [...current, source])
          setRetrievalStep(index + 1)
        }, 220 * (index + 1))
      })

      const analysisResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, searchResults: results, uploadedData }),
      })
      const analysisPayload = await analysisResponse.json()
      if (!analysisResponse.ok) throw new Error(analysisPayload.error || '搜索完成，但 AI 分析失败。')

      const result = analysisPayload.analysis
      setAnalysisData({
        ...result,
        competitors: `${result.competitorsCount} 个`,
        sources,
      })
      setHasAnalysis(true)
      const historyItem = { query, verdict: result.verdict, score: result.score, at: new Date().toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }
      setHistory(current => { const next = [historyItem, ...current.filter(item => item.query !== query)].slice(0, 5); localStorage.setItem('presight-history', JSON.stringify(next)); return next })
      window.setTimeout(() => {
        setAnalyzed(true)
        setRunning(false)
      }, Math.max(0, 220 * (sources.length + 1)))
    } catch (error) {
      if (error.message.includes('搜索失败') || error.message.includes('TAVILY') || error.message.includes('搜索服务')) setSearchError(error.message)
      else setAnalysisError(error.message)
      setAnalyzed(true)
      setRunning(false)
    }
  }


  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark"><Sparkles size={15} /></span><strong>PreSight AI</strong></div>
        <div className="topbar-right"><span className="data-badge"><span className="live-dot" />{liveSearch ? '实时检索' : '等待检索'}</span></div>
      </header>

      <main className="page">
        <section className="intro">
          <h1>先判断值不值得做，<em>再开始开发。</em></h1>
        </section>

        <HomeHero history={history} onOpenHistory={() => setHistoryView(true)} />
        {historyView && <HistoryPage history={history} onBack={() => setHistoryView(false)} onDelete={deleteHistoryItem} onSelect={query => { setIdea(query); setNeedsAnalysis(true); setHasAnalysis(false); setHistoryView(false) }} />} 

        <section className="input-card">
          <div className="input-label"><Target size={15} />产品想法</div>
          <textarea value={idea} onChange={e => { setIdea(e.target.value); setNeedsAnalysis(true); setHasAnalysis(false); setAnalyzed(false); setFoundSources([]); setRetrievalStep(0) }} onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') analyze() }} placeholder="输入你的产品想法，描述目标用户、要解决的问题或产品方向…" />
          <div className="input-bottom"><span className="input-hint">{needsAnalysis ? '内容已更新，点击开始分析' : '⌘ / Ctrl + Enter 快速分析'}</span><button className="analyze-button" onClick={analyze} disabled={running || !idea.trim()}>{running ? <><LoaderCircle size={15} className="spin" />检索中</> : <>开始分析 <ArrowRight size={15} /></>}</button></div>
        </section>

        {analysisError ? <div className="search-error analysis-warning"><div className="section-label"><Info size={15} />分析未完成</div><strong>{analysisError}</strong><p>网页已经搜到，但还没有生成动态市场结论。请配置 OPENAI_API_KEY 后重试。</p><button className="retry-button" onClick={analyze}>重试分析 <ArrowRight size={14} /></button></div> : searchError ? <div className="search-error"><div className="section-label"><Info size={15} />搜索未完成</div><strong>{searchError}</strong><p>请检查服务端是否启动，以及项目根目录是否配置了 TAVILY_API_KEY。</p><button className="retry-button" onClick={analyze}>重试搜索 <ArrowRight size={14} /></button></div> : !analyzed ? <div className="retrieval-card"><div className="retrieval-head"><div><div className="section-label"><LoaderCircle size={15} className="spin" />正在检索公开来源</div><strong>正在搜索与“{idea.length > 32 ? `${idea.slice(0, 32)}…` : idea}”相关的真实网页</strong></div><span>{retrievalStep}/{retrievalSources.length || '…'}</span></div><div className="retrieval-list">{foundSources.map(source => <a className="retrieval-source" href={source.url} target="_blank" rel="noreferrer" key={source.label}><span className="retrieved-check"><Check size={12} /></span><div><strong>{source.label}</strong><small>{source.reason}</small></div><span className="source-type">{source.type}</span><ArrowRight size={14} /></a>)}{retrievalStep < retrievalSources.length && <div className="retrieval-placeholder"><LoaderCircle size={14} className="spin" />继续查找相关来源…</div>}</div></div> : !hasAnalysis ? <><HomeLanding onOpenAdsPower={openAdsPower} uploadedFiles={uploadedFiles} onFileUpload={handleFileUpload} />{adsPowerMessage && <div className="adspower-message">{adsPowerMessage}</div>}</> : <>
          <section className="decision-card"><div className="decision-main"><div className="section-label"><ShieldCheck size={15} />AI 决策摘要</div><div className="decision-line"><h2>{data.verdict}</h2><span className="score-pill">市场吸引力 {data.score}/100</span></div><p>{data.insight}</p><div className="decision-meta"><span><Users size={14} /><strong>推荐人群</strong><em>{data.segment}</em></span><span><TrendingUp size={14} /><strong>市场增长</strong><em>{data.market.growth}</em></span></div></div><div className="score-ring" style={{'--progress': `${data.score * 3.6}deg`}}><strong>{data.score}</strong><span>/100</span></div></section>

          <section className="key-metrics"><Metric icon={<BarChart3 size={16} />} label="可服务市场 SAM" value={formatMarketValue(data.market.sam)} note={marketNote(data.market.sam)} compact={isLongMarketValue(data.market.sam)} /><Metric icon={<TrendingUp size={16} />} label="3 年机会 SOM" value={formatMarketValue(data.market.som)} note={marketNote(data.market.som)} compact={isLongMarketValue(data.market.som)} /></section>

          <CompetitorSection profiles={data.competitorProfiles || []} count={data.competitors} onOpenAdsPower={openAdsPower} adsPowerMessage={adsPowerMessage} />

          <section className="content-grid"><div className="panel"><PanelTitle icon={<Lightbulb size={16} />} title="最值得验证的机会" /><div className="opportunity-list">{data.opportunities.map((item, index) => <div className="opportunity" key={item.title}><span className={`number ${item.tone}`}>0{index + 1}</span><div><strong>{item.title}</strong><p>{item.text}</p></div></div>)}</div></div><div className="panel"><PanelTitle icon={<Sparkles size={16} />} title="第一版 MVP 只做这些" /><div className="mvp-list">{data.mvp.map((item, index) => <div className="mvp-item" key={item}><span><Check size={13} /></span><strong>{item}</strong><small>P0</small></div>)}</div><div className="mvp-note"><Info size={14} />先用 3–5 个目标客户验证，再扩展功能。</div></div></section>

          {liveSearch && <section className="evidence evidence-full"><div className="evidence-title"><FileText size={16} /><div><strong>分析参考来源</strong><span>{searchResults.length} 个网页 · 以下结论基于这些公开页面整理</span></div></div><div className="evidence-list">{searchResults.map((result, index) => <a className="evidence-item" href={result.url} target="_blank" rel="noreferrer" key={result.url}><span className="evidence-index">{String(index + 1).padStart(2, '0')}</span><div className="evidence-copy"><strong>{result.title}</strong><small>{result.source} · {result.content || '暂无摘要'}</small><code>{result.url}</code></div><ArrowRight size={14} /></a>)}</div></section>}
        </>}
      </main>

    </div>
  )
}


function CompetitorSection({ profiles, count, onOpenAdsPower, adsPowerMessage }) {
  const [expanded, setExpanded] = useState(false)
  const visibleProfiles = expanded ? profiles : profiles.slice(0, 4)
  return <section className="competitor-section"><div className="competitor-head"><div><div className="section-label"><Network size={15} />竞品分析</div><h3>市场上有哪些产品？</h3><p>基于本次搜索结果整理竞品定位、核心特点和可切入的空白。</p></div><span className="competitor-count">{count || '—'} 相关竞品</span></div><div className="sensor-verify-row"><div><strong>下一步：用 Sensor Tower 核验竞品</strong><small>补充下载量、收入、排名和趋势数据，再生成更可靠的市场判断。</small></div><button className="verify-button" onClick={onOpenAdsPower}><ExternalLink size={13} />在 AdsPower 中打开</button></div>{adsPowerMessage && <div className="adspower-message inline">{adsPowerMessage}</div>}{profiles.length ? <><div className="competitor-grid">{visibleProfiles.map((item, index) => <article className="competitor-card" key={`${item.name}-${index}`}><div className="competitor-card-top"><span className="competitor-index">{String(index + 1).padStart(2, '0')}</span><strong>{item.name}</strong></div><div className="competitor-field"><small>定位</small><span>{item.positioning}</span></div><div className="competitor-field"><small>特点</small><span>{item.features}</span></div><div className="competitor-bottom"><span><b>相关性：</b>{item.relevance}</span><span><b>可切入空白：</b>{item.gap}</span></div></article>)}</div>{profiles.length > 4 && <button className="competitor-expand" onClick={() => setExpanded(value => !value)}>{expanded ? '收起竞品' : `展开查看全部（${profiles.length} 个）`}<ArrowRight size={14} className={expanded ? 'rotate-left' : ''} /></button>}</> : <div className="competitor-empty"><Network size={18} /><span>当前模型还没有整理出结构化竞品画像；请查看下方来源，或补充更多搜索结果后重试。</span></div>}</section>
}

function HomeHero({ history, onOpenHistory }) {
  return <section className="landing-intro standalone-hero">
    <div className="hero-main"><span className="landing-kicker"><Sparkles size={14} />一个入口，完成一次产品判断</span><h2>把模糊的想法，<em>变成可验证的方向。</em></h2><p>PreSight AI 会先检索公开网页，再结合有权限的数据，整理竞品、市场信号与 MVP 建议。</p></div>
    <button className="history-entry" onClick={onOpenHistory}><FileText size={15} /><strong>历史分析</strong><ArrowRight size={14} /></button>
  </section>
}

function HistoryPage({ history, onBack, onSelect, onDelete }) {
  return <section className="history-page"><div className="history-page-head"><div><button className="back-button" onClick={onBack}>← 返回首页</button><h2>历史分析</h2><p>查看之前保存的产品判断。</p></div><span className="history-count">{history.length} 条记录</span></div>{history.length ? <div className="history-page-list">{history.map(item => <div className="history-page-item" key={`${item.query}-${item.at}`}><button className="history-item-main" onClick={() => onSelect(item.query)}><span className="history-score large">{item.score}</span><div><strong>{item.query}</strong><small>{item.verdict} · {item.at}</small></div></button><button className="history-delete" aria-label={`删除 ${item.query}`} onClick={() => onDelete(item)}><Trash2 size={16} /></button><button className="history-open" aria-label={`打开 ${item.query}`} onClick={() => onSelect(item.query)}><ArrowRight size={16} /></button></div>)}</div> : <div className="history-page-empty"><FileText size={22} /><strong>还没有历史分析</strong><span>完成第一次分析后，记录会自动出现在这里。</span><button className="primary-small" onClick={onBack}>开始第一次分析</button></div>}</section>
}

function HomeLanding({ onOpenAdsPower, uploadedFiles, onFileUpload }) {
  return <div className="home-landing">
    <section className="landing-columns">
      <div className="landing-panel"><div className="landing-panel-title"><Database size={16} /><strong>可接入的数据</strong></div><div className="data-source-row"><span className="source-mark blue"><Globe2 size={15} /></span><div><strong>公开网页搜索</strong><small>行业报告、官网、产品页、用户评价</small></div><span className="source-status">已接入</span></div><div className="data-source-row upload-source-row"><span className="source-mark green"><Upload size={15} /></span><div><strong>团队数据文件</strong><small>CSV / Excel / PDF，上传参考资料辅助分析</small></div><label className="upload-button"><Upload size={12} />{uploadedFiles.length ? `已上传 ${uploadedFiles.length} 个` : '上传资料'}<input type="file" accept=".csv,.xlsx,.xls,.pdf,.doc,.docx,.txt,.md" multiple onChange={onFileUpload} /></label></div>{uploadedFiles.length > 0 && <div className="uploaded-file-list">{uploadedFiles.map(file => <span key={`${file.name}-${file.size}`}><FileText size={12} />{file.name}</span>)}{uploadMessage && <small className="upload-message">{uploadMessage}</small>}</div>}</div>
      <div className="landing-panel"><div className="landing-panel-title"><ShieldCheck size={16} /><strong>输出内容</strong></div><div className="output-tags"><span>市场进入建议</span><span>竞品数量与名单</span><span>目标用户</span><span>机会切口</span><span>MVP 功能</span><span>来源证据</span></div><div className="landing-note">先输入一个产品想法，分析区会替换为本次检索结果。</div></div>
    </section>
    <section className="source-preview source-placeholder"><div className="source-preview-head"><div className="landing-panel-title"><FileText size={16} /><strong>分析参考来源</strong></div><span>等待分析</span></div><p>完成分析后，这里会列出本次检索实际参考的网页、文档和链接。</p></section>
  </div>
}

function WorkflowStep({ number, icon, title, text }) { return <div className="workflow-step"><span className="workflow-number">{number}</span><span className="workflow-icon">{icon}</span><div><strong>{title}</strong><p>{text}</p></div></div> }

function isLongMarketValue(value) { return typeof value === 'string' && (value.length > 24 || value.includes('暂无') || value.includes('待验证')) }
function formatMarketValue(value) { return isLongMarketValue(value) ? '待验证' : value }
function marketNote(value) { return isLongMarketValue(value) ? '公开数据不足，需补充 Sensor Tower 或团队数据' : '' }
function Metric({ icon, label, value, note, compact }) { return <div className={`metric ${compact ? 'metric-compact' : ''}`}><span className="metric-icon">{icon}</span><div><small>{label}</small><strong>{value}</strong>{note && <em>{note}</em>}</div></div> }
function PanelTitle({ icon, title }) { return <div className="panel-title"><span>{icon}</span><h3>{title}</h3></div> }

createRoot(document.getElementById('root')).render(<App />)
