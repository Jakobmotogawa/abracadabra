import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create a sample kit
  const sampleKit = await prisma.kit.create({
    data: {
      title: 'Mystical Wizard Costume',
      theme: 'wizard',
      slug: 'mystical-wizard-123',
      items: {
        create: [
          {
            slot: 'top',
            label: 'Dark Wizard Robe',
            vendor: 'amazon',
            affiliateUrl: 'https://example.com/wizard-robe',
            imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
            price: 45.99,
            size: 'L'
          },
          {
            slot: 'accessory',
            label: 'Pointed Wizard Hat',
            vendor: 'amazon',
            affiliateUrl: 'https://example.com/wizard-hat',
            imageUrl: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=300&h=300&fit=crop',
            price: 19.99,
            size: 'One Size'
          },
          {
            slot: 'footwear',
            label: 'Medieval Boots',
            vendor: 'amazon',
            affiliateUrl: 'https://example.com/medieval-boots',
            imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop',
            price: 89.99,
            size: '10'
          },
          {
            slot: 'prop',
            label: 'Wooden Magic Wand',
            vendor: 'amazon',
            affiliateUrl: 'https://example.com/magic-wand',
            imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
            price: 24.99,
            size: 'One Size'
          },
          {
            slot: 'bottom',
            label: 'Dark Leggings',
            vendor: 'amazon',
            affiliateUrl: 'https://example.com/dark-leggings',
            imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop',
            price: 29.99,
            size: 'L'
          }
        ]
      }
    },
    include: {
      items: true
    }
  })

  console.log('✅ Sample kit created:', sampleKit.slug)
  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })