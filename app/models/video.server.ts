import { prisma } from '~/libs/prisma'
import { createThumbnailUrl } from '~/utils/createThumbnailUrl'

export const fetchVideos = async (userId: string) => {
  try {
    await prisma.$connect()
    const videos = await prisma.video.findMany({ where: { userId } })
    return videos
  } catch (error) {
    return error
  } finally {
    await prisma.$disconnect()
  }
}

export const addVideo = async (userId: string, videoUrl: string) => {
  try {
    await prisma.$connect()
    const thumbnailUrl = createThumbnailUrl(videoUrl)
    const convertedVideoUrl = videoUrl.replace('watch?v=', 'embed/')
    if (!thumbnailUrl) {
      throw new Error('URLが不正です')
    }
    await prisma.video.create({ data: { userId, videoUrl: convertedVideoUrl, thumbnailUrl } })
  } catch (e) {
    throw new Error('データベースにアクセスできませんでした')
  } finally {
    await prisma.$disconnect()
  }
}
