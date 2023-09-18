import { Github,  Wand2 } from 'lucide-react'
import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from './components/ui/select'
import { Slider } from './components/ui/slider'
import { VideoInputForm } from './components/video-input-form'
import { PromptSelect } from './components/prompt-select'
import { useState } from 'react'
import { useCompletion } from 'ai/react'

export function App() {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [temperature, setTemperature] = useState(0.5)

  // function handlePromptSelected(template: string) {
  //   console.log(template)
  // }

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
      
    },
    headers: {
      'Content-type': 'application/json',
    }
  })
  return (
    <div>
      <div className='min-h-screen flex flex-col'>
        
        <div className='px-6 py-3 flex items-center justify-between border-b'>
          <h1 className='text-xl font-bold text-amber-50'>upload<code className="text-violet-400">.ai</code></h1>
          
          <div className='flex items-center gap-3'>
            <span className='text-sm text-amber-50'>Desenvolvido com ❤️ no NLW da Rocketseat</span>
            
            <Separator orientation="vertical" className="h-6" />
            
            <Button className="text-amber-50">
              <Github className='w-4 h-4 mr-2' />
              Github
            </Button>
          </div>
        </div>
        <main className='flex-1 p-6 flex gap-6'>
          <div className='flex flex-col flex-1 gap-4'>
            <div className='grid grid-rows-2 gap-4 flex-1'>
              <Textarea placeholder="Inclua o prompt para a IA..." className="resize-none p-4 leading-relaxed text-amber-50" value={input} onChange={handleInputChange} />
              <Textarea placeholder="Resultado gerado pela IA..." className="resize-none p-4 leading-relaxed text-amber-50 " readOnly value={completion} />
            </div>
            <p className="text-sm text-muted-foreground">
              Lembre-se: você pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado
            </p>
          </div>
          <aside className="w-72 space-y-5">
            
            <VideoInputForm  onVideoUploaded={setVideoId} />
            
            <Separator />

            <form  onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 text-amber-50">
                    <Label>Prompt</Label>
                    <PromptSelect  onPromptSelected={setInput} />

                </div>
                <div className="space-y-2 text-amber-50">
                    <Label>Modelo</Label>
                    <Select disabled defaultValue='gpt3.5'>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                        </SelectContent>
                    </Select>
                    <span
                        className="block text-xs text-muted-foreground italic">Você poderá customizar esta opção em breve.
                    </span>

                    <div className="space-y-4">
                        <Label>Temperatura</Label>
                        <Slider 
                          defaultValue={[0.5]}
                          min={0} 
                          max={1} 
                          step={0.1} 
                          value={[temperature]} 
                          onValueChange={value => setTemperature([0])} 
                        />
                        <span
                            className="block text-xs text-muted-foreground italic">Valores mais altos tendem a deixar o resultado mais criativo e mais sujeito e com possíveis erros.
                        </span>
                    </div>
                    <Separator />
                    <Button  disabled={isLoading} type="submit" className="w-full">
                        Executar
                        <Wand2 className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </form>
          </aside>
        </main>
      </div>
    </div>
  )
}


