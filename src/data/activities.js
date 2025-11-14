import activitiesData from './activities.json'

export const activities = activitiesData

export function getCategories() {
  return activitiesData.categories
}

export function getSubcategories(category, locationType = 'indoor') {
  if (!category || !activitiesData[locationType]) {
    return []
  }
  return activitiesData[locationType][category] || []
}

export function getAllSubcategories(category) {
  const indoor = activitiesData.indoor[category] || []
  const outdoor = activitiesData.outdoor[category] || []
  const both = activitiesData.both[category] || []
  
  // Combine and remove duplicates
  const all = [...new Set([...indoor, ...outdoor, ...both])]
  return all.sort()
}

export function getActivitiesByLocation(locationType) {
  return activitiesData[locationType] || {}
}

export default activitiesData

