import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Tooltip,
    Chip,
    Box,
    // Button,
  } from '@mui/material'
  import {
    AutoStories,
    Psychology,
    Translate,
    RecordVoiceOver,
    Favorite,
    FavoriteBorder,
    Share,
  } from '@mui/icons-material'
  import { useState } from 'react'
  import { Book } from '../../types'
  
  interface BookCardProps {
    book: Book
    onAIFeatureClick: (feature: string) => void
  }
  
  export default function BookCard({ book, onAIFeatureClick }: BookCardProps) {
    const [isFavorite, setIsFavorite] = useState(false)
  
    const aiFeatures = [
      { icon: <AutoStories />, name: 'summary', label: 'Smart Summary', available: book.aiFeatures.hasSummary },
      { icon: <Psychology />, name: 'analysis', label: 'AI Analysis', available: book.aiFeatures.hasAnalysis },
      { icon: <Translate />, name: 'translation', label: 'Translation', available: book.aiFeatures.hasTranslation },
      { icon: <RecordVoiceOver />, name: 'audiobook', label: 'Text to Speech', available: book.aiFeatures.hasAudiobook },
    ]
  
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={book.coverUrl}
          alt={book.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            by {book.author}
          </Typography>
          <Box sx={{ mb: 2 }}>
            {book.categories.map((category) => (
              <Chip
                key={category}
                label={category}
                size="small"
                sx={{ mr: 0.5, mb: 0.5 }}
              />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            {book.summary}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Box>
              {aiFeatures.map((feature) => (
                feature.available && (
                  <Tooltip key={feature.name} title={feature.label}>
                    <IconButton
                      size="small"
                      onClick={() => onAIFeatureClick(feature.name)}
                    >
                      {feature.icon}
                    </IconButton>
                  </Tooltip>
                )
              ))}
            </Box>
            <Box>
              <IconButton
                aria-label="add to favorites"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
            </Box>
          </Box>
        </CardActions>
      </Card>
    )
  }