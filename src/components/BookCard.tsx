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
} from '@mui/material';
import {
  AutoStories,
  Psychology,
  Translate,
  RecordVoiceOver,
  Favorite,
  FavoriteBorder,
  Share,
} from '@mui/icons-material';
import { useState } from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onAIFeatureClick: (feature: string) => void;
}

export default function BookCard({ book, onAIFeatureClick }: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const aiFeatures = (book: Book) =>
    [
      { icon: <AutoStories />, name: 'summary', label: 'Smart Summary', available: book.aiFeatures.hasSummary },
      { icon: <Psychology />, name: 'analysis', label: 'AI Analysis', available: book.aiFeatures.hasAnalysis },
      { icon: <Translate />, name: 'translation', label: 'Translation', available: book.aiFeatures.hasTranslation },
      { icon: <RecordVoiceOver />, name: 'audiobook', label: 'Text to Speech', available: book.aiFeatures.hasAudiobook },
    ].filter((feature) => feature.available);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={book.coverUrl}
        alt={book.title}
        sx={{ objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          by <strong>{book.author}</strong>
        </Typography>
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap' }}>
          {book.categories.map((category) => (
            <Chip key={category} label={category} size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: 'primary.light' }} />
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          {book.summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: '10px 16px' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {aiFeatures(book).map((feature) => (
            <Tooltip key={feature.name} title={feature.label}>
              <IconButton
                size="small"
                onClick={() => onAIFeatureClick(feature.name)}
                sx={{
                  color: 'primary.main',
                  transition: 'all 0.2s',
                  '&:hover': { color: 'primary.dark', transform: 'scale(1.1)' },
                }}
              >
                {feature.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
        <Box>
          <IconButton
            aria-label="add to favorites"
            onClick={() => setIsFavorite((prev) => !prev)}
            sx={{
              color: isFavorite ? 'error.main' : 'inherit',
              transition: 'all 0.2s',
              '&:hover': { transform: 'scale(1.2)' },
            }}
          >
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <IconButton
            aria-label="share"
            sx={{ transition: 'all 0.2s', '&:hover': { transform: 'scale(1.2)' } }}
          >
            <Share />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

   